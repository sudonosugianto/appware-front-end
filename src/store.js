import createStore from "unistore";
import devtools from "unistore/devtools"
import axios from "axios"
import persistStore from "unissist"
import localStorageAdapter from "unissist/integrations/localStorageAdapter"
import swal from 'sweetalert2';

const initialState = {
  toggle: false,
  ListItem: [],
  ListCategory: [],
  ListPackages: [],
  ListSupplier: [],
  ListCustomers: [],
  ListEmployees: [],
  ListTrasactions: [],
  Listsummary : [],
  ListSales : [],
  ListQrCode : [],
  ListQrSearch : '' ,
  summary : [],
  token : '',
  is_login : '',

  from: undefined,
  to: undefined
}

const store =
  process.env.NODE_ENV === "production"
    ? createStore(initialState)
    : devtools(createStore(initialState));

const adapter = localStorageAdapter();
persistStore(store, adapter)

const actions = store => ({

  switchToggle: (state) => {
    store.setState({
      toggle: !state.toggle
    })
  },
  setDate: (state, from, to) => {
    store.setState({
      from: from,
      to: to
    })
  },
  handleSearch: async (state, keyword, token) => {
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/item?search=" + keyword, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ ListItem: response.data.item });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  handleSearchCategory: async (state, keyword, token) => {
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/category?search=" + keyword, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ ListCategory: response.data.category });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  handleSearchPackages: async (state, keyword, token) => {
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/packages?search=" + keyword, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ ListPackages: response.data.packages });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  handleSearchSummary: async (state, keyword, token) => {
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/summary?search=" + keyword, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ Listsummary: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  handleSearchSuppliers: async (state, keyword, token) => {
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/suppliers?search=" + keyword, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ ListSupplier: response.data.supplier });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  handleSearchCustomers: async (state, keyword, token) => {
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/customers?search=" + keyword, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ ListCustomers: response.data.customers });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  handleSearchTransactions: async (state, keyword, token) => {
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/posalestransactions?search=" + keyword, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ ListTrasactions: response.data.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  handleSearchSales: async (state, keyword, token) => {
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/sales?search=" + keyword, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ ListSales: response.data.sales });
      })
      .catch(function (error) {
        // alert('data not found')
        // console.log(error);
      });
  },
  handleSearchPurchaseOrder: async (state, keyword, token) => {
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/po?search=" + keyword, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ListPurchaseOrder: response.data.PO  });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  handleSearchQrCode: async (state, keyword, token) => {
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/track?code=" + keyword, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ListQrSearch: response.data  });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  getAllItems: async (state, token) => {
    // console.log('Token getAllItems', token)
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/item", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ ListItem: response.data.item });
      })
      .catch(function (error) {
        console.log(error);
        store.setState({ ListItem: [] })
        // alert('error getting the file')
      });
  },
  getAllCategory: async (state, token) => {
    // console.log('Token getAllItems', token)
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/category", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ ListCategory: response.data.category });
      })
      .catch(function (error) {
        console.log(error);
        store.setState({ ListCategory: [] })
        // alert('error getting the file')
      });
  },
  getAllPackages: async (state, token) => {
    // console.log('Token getAllItems', token)
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/packages", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ ListPackages: response.data.packages });
      })
      .catch(function (error) {
        console.log(error);
        store.setState({ ListPackages: [] })
        // alert('error getting the file')
      });
  },
  getSuppliers: async (state, token) => {
    // console.log('Token getAllItems', token)
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/suppliers", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ ListSupplier: response.data.supplier });
      })
      .catch(function (error) {
        console.log(error);
        store.setState({ ListSupplier: [] })
        // alert('error getting the file')
      });
  },
  getCustomers: async (state, token) => {
    // console.log('Token getAllItems', token)
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/customers", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ ListCustomers: response.data.customers });
      })
      .catch(function (error) {
        console.log(error);
        store.setState({ ListCustomers: [] })
        // alert('error getting the file')
      });
  },

  getAllTransactions: async (state, token, dateBefore, dateAfter) => {
    // alert(dateBefore)
    // alert(dateAfter)
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/posalestransactions?dateStart="+dateBefore+"&dateEnd="+dateAfter, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ ListTrasactions: response.data.data });
        // console.log('Token getAllIdata transac', response.data.data)
      })
      .catch(function (error) {
        console.log(error);
        store.setState({ ListTrasactions: [] })
        // alert('error getting the file')
      });
  },
  getAllPurchaseOrder: async (state, token, dateBefore, dateAfter) => {
    // alert(dateBefore)
    // alert(dateAfter)
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/po?dateStart="+dateBefore+"&dateEnd="+dateAfter, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ ListPurchaseOrder: response.data.PO });
        // console.log('get all purchase order', response.data.PO)
      })
      .catch(function (error) {
        console.log(error);
        store.setState({ ListPurchaseOrder: [] })
        // alert('Not Founds')
      });
  },
  getAllSales: async (state, token, dateBefore, dateAfter) => {
    // alert(dateBefore)
    // alert(dateAfter)
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/sales?dateStart="+dateBefore+"&dateEnd="+dateAfter, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ ListSales: response.data.sales });
        // console.log('get all purchase order', response.data.PO)
      })
      .catch(function (error) {
        console.log(error);
        store.setState({ ListSales: [] })
        // alert('Not Founds')
      });
  },
  getAllSummary: async (state, token, dateBefore, dateAfter) => {
    // alert(dateBefore)
    // alert(dateAfter)
    
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/summary?dateStart="+dateBefore+"&dateEnd="+dateAfter, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ Listsummary: response.data });
        console.log('getting file summary', response.data)
      })
      .catch(function (error) {
        console.log(error);
        store.setState({ Listsummary: [] })
        // alert('error getting the file')
      });
  },
  
  getJustSummary: async (state, token) => {
    // alert(dateBefore)
    // alert(dateAfter)
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/summary", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ summary: response.data });
        // console.log('Token summary', response.data)
      })
      .catch(function (error) {
        console.log(error);
        store.setState({ summary: [] })
        // alert('error getting the file')
      });
  },
  getAllQrCode: async (state, token, dateBefore, dateAfter) => {
    // alert(dateBefore)
    // alert(dateAfter)
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/track", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ ListQrCode: response.data });
        // console.log('Token getAllItems', response.data)
      })
      .catch(function (error) {
        console.log(error);
        store.setState({ ListQrCode: [] })
        // alert('error getting the file')
      });
  },

  Delete: async (state, url, id, headers) => {
    await axios.delete(url + id, { headers })
      .then(result => {
        alert("delete success");
      })
      .catch(function (error) {
        console.log(error);
        alert("error");
      });
  },
  handleLogout: (state) => {
    store.setState({
      token: '',
      is_login: '',
      toggle: false,
      ListItem: [],
      ListCategory: [],
      ListPackages: [],
      ListSupplier: [],
      ListCustomers: [],
      ListEmployees: [],
      ListTrasactions: [],
      Listsummary : [],
      from: undefined,
      to: undefined
    })
    // alert("Signed Out Successfully")
    swal({
      title: 'Thank You for using AppWare !',
      showConfirmButton: false,
      timer: 2000
    })
  },
  DeleteCategory: async (state, url, id, headers) => {
    await axios.delete(url + id, { headers })
      .then(result => {
        alert("delete success");
      })
      .catch(function (error) {
        console.log(error);
        alert("error");
      });
  },
  DeletePackages: async (state, url, id, headers) => {
    await axios.delete(url + id, { headers })
      .then(result => {
        alert("delete success");
      })
      .catch(function (error) {
        console.log(error);
        alert("error");
      });
  },
  DeleteSuppliers: async (state, url, id, headers) => {
    await axios.delete(url + id, { headers })
      .then(result => {
        alert("delete success");
      })
      .catch(function (error) {
        console.log(error);
        alert("error");
      });
  },
  DeleteCustomers: async (state, url, id, headers) => {
    await axios.delete(url + id, { headers })
      .then(result => {
        alert("delete success");
      })
      .catch(function (error) {
        console.log(error);
        alert("error");
      });
  },
  postLogin: async (state, email, password) => {
    const data = {
      email: email,
      password: password,
    };
    await axios
      .post("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/login", data)
      .then((response) => {
        // console.log("ayam", response.data);
        swal({
          title: 'Welcome to AppWare !',
          showConfirmButton: false,
          timer: 2000
        })
        store.setState({
          "token": response.data.token,
          "is_login": true
        });
        console.log("Response: ", response)
      })
      .catch((error) => {
        console.log(error);
        alert("Maaf email atau password anda tidak valid");
      });
  },
  getEmployees: async (state, token) => {
    console.log('Token getAllItems', token)
    await axios
      .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/subusers", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        // handle success
        store.setState({ ListEmployees: response.data.subuser });
        console.log("subuser", response.data.subuser)
      })
      .catch(function (error) {
        console.log(error);
        store.setState({ ListEmployees: [] })
        // alert('error getting the file')
      });
  },
  DeleteEmployee: async (state, url, id, headers) => {
    await axios.delete(url + id, { headers })
      .then(result => {
        alert("delete success");
      })
      .catch(function (error) {
        console.log(error);
        alert("error");
      });
  },
})

export { store, actions }