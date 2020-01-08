import React from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import loading from '../Assets/copper-loader.gif'
import logo from '../Assets/logo_transparent.png'

const Loading = () => <div>
  <div className="container text-center">
    <div className="row row-center">
        <div className="col-xs-10 col-sm-10" style={{margin: "auto", marginTop: "15%"}}>
          <img src={logo} style={{height: 200, marginBottom: 30}}/>
          <h6></h6>
          <img src={loading}/>
      </div>
    </div>
  </div>
</div>

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "Home"*/ "../Pages/Home"),
  loading: () => <Loading />
});

const GetQr = Loadable({
  loader: () => import(/* webpackChunkName: "GetQr"*/ "../Pages/GetQr"),
  loading: () => <Loading />
});


const EditPackages = Loadable({
  loader: () => import(/* webpackChunkName: "EditPackages"*/ "../Pages/EditPackages"),
  loading: () => <Loading />
});
const SignIn = Loadable({
  loader: () => import(/* webpackChunkName: "SignIn"*/ "../Pages/SignIn"),
  loading: () => <Loading />
});

const SignUp = Loadable({
  loader: () => import(/* webpackChunkName: "SignUp"*/ "../Pages/SignUp"),
  loading: () => <Loading />
});

const Dashboard = Loadable({
  loader: () => import(/* webpackChunkName: "Dashboard"*/ "../Pages/Dashboard"),
  loading: () => <Loading />
});

const NotMatch = Loadable({
  loader: () => import(/* webpackChunkName: "NotMatch"*/ "../Pages/NotMatch"),
  loading: () => <Loading />
});

const ItemLibrary = Loadable({
  loader: () => import(/* webpackChunkName: "ItemLibrary"*/ "../Pages/ItemLibrary"),
  loading: () => <Loading />
});

const TambahItem = Loadable({
  loader: () => import(/* webpackChunkName: "TambahItem"*/ "../Pages/TambahItem"),
  loading: () => <Loading />
});

const ItemDetail = Loadable({
  loader: () => import(/* webpackChunkName: "ItemDetail"*/ "../Pages/ItemDetail"),
  loading: () => <Loading />
});

const EditItem = Loadable({
  loader: () => import(/* webpackChunkName: "EditItem"*/ "../Pages/EditItem"),
  loading: () => <Loading />
});

const CategoryItem = Loadable({
  loader: () => import(/* webpackChunkName: "CategoryItem"*/ "../Pages/CategoryItem"),
  loading: () => <Loading />
});

const TambahCategory = Loadable({
  loader: () => import(/* webpackChunkName: "TambahCategory"*/ "../Pages/TambahCategory"),
  loading: () => <Loading />
});

const EditCategory = Loadable({
  loader: () => import(/* webpackChunkName: "EditCategory"*/ "../Pages/EditCategory"),
  loading: () => <Loading />
});

const Packages = Loadable({
  loader: () => import(/* webpackChunkName: "Packages"*/ "../Pages/Packages"),
  loading: () => <Loading />
});

const TambahPackages = Loadable({
  loader: () => import(/* webpackChunkName: "TambahPackages"*/ "../Pages/TambahPackages"),
  loading: () => <Loading />
});


const DetailPackages = Loadable({
  loader: () => import(/* webpackChunkName: "DetailPackages"*/ "../Pages/DetailPackages"),
  loading: () => <Loading />
});

const Summary = Loadable({
  loader: () => import(/* webpackChunkName: "Summary"*/ "../Pages/Summary"),
  loading: () => <Loading />
});

const Suppliers = Loadable({
  loader: () => import(/* webpackChunkName: "Suppliers"*/ "../Pages/Suppliers"),
  loading: () => <Loading />
});

const EditSupplier = Loadable({
  loader: () => import(/* webpackChunkName: "EditSupplier"*/ "../Pages/EditSupplier"),
  loading: () => <Loading />
});

const TambahSupplier = Loadable({
  loader: () => import(/* webpackChunkName: "TambahSupplier"*/ "../Pages/TambahSupplier"),
  loading: () => <Loading />
});

const PurchaseOrder = Loadable({
  loader: () => import(/* webpackChunkName: "PurchaseOrder"*/ "../Pages/PurchaseOrder"),
  loading: () => <Loading />
});

const TambahPO = Loadable({
  loader: () => import(/* webpackChunkName: "TambahPO"*/ "../Pages/TambahPO"),
  loading: () => <Loading />
});

const Adjustment = Loadable({
  loader: () => import(/* webpackChunkName: "Adjustment"*/ "../Pages/Adjustment"),
  loading: () => <Loading />
});

const TambahAdjustment = Loadable({
  loader: () => import(/* webpackChunkName: "TambahAdjustment"*/ "../Pages/TambahAdjustment"),
  loading: () => <Loading />
});

const Customers = Loadable({
  loader: () => import(/* webpackChunkName: "Customers"*/ "../Pages/Customers"),
  loading: () => <Loading />
});

const TambahCustomer = Loadable({
  loader: () => import(/* webpackChunkName: "TambahCustomer"*/ "../Pages/TambahCustomer"),
  loading: () => <Loading />
});


const EditCustomers = Loadable({
  loader: () => import(/* webpackChunkName: "EditCustomers"*/ "../Pages/EditCustomers"),
  loading: () => <Loading />
});


const SalesSummary = Loadable({
  loader: () => import(/* webpackChunkName: "SalesSummary"*/ "../Pages/SalesSummary"),
  loading: () => <Loading />
});

const ItemSales = Loadable({
  loader: () => import(/* webpackChunkName: "ItemSales"*/ "../Pages/ItemSales"),
  loading: () => <Loading />
});

const CategorySales = Loadable({
  loader: () => import(/* webpackChunkName: "CategorySales"*/ "../Pages/CategorySales"),
  loading: () => <Loading />
});

const Transactions = Loadable({
  loader: () => import(/* webpackChunkName: "Transactions"*/ "../Pages/Transactions"),
  loading: () => <Loading />
});

const Profile = Loadable({
  loader: () => import(/* webpackChunkName: "Profile"*/ "../Pages/Profile"),
  loading: () => <Loading />
});

const EditProfile = Loadable({
  loader: () => import(/* webpackChunkName: "EditProfile"*/ "../Pages/EditProfile"),
  loading: () => <Loading />
});

const TambahSales = Loadable({
  loader: () => import(/* webpackChunkName: "TambahSales"*/ "../Pages/TambahSales"),
  loading: () => <Loading />
});

const Sales = Loadable({
  loader: () => import(/* webpackChunkName: "Sales"*/ "../Pages/Sales"),
  loading: () => <Loading />
});


const PrintQr = Loadable({
  loader: () => import(/* webpackChunkName: "PrintQr"*/ "../Pages/PrintQr"),
  loading: () => <Loading />
});

const Employees = Loadable({
  loader: () => import(/* webpackChunkName: "Employees"*/ "../Pages/Employees"),
  loading: () => <Loading />
});

const TambahEmployee = Loadable({
  loader: () => import(/* webpackChunkName: "TambahEmployee"*/ "../Pages/TambahEmployee"),
  loading: () => <Loading />
});
const Track = Loadable({
  loader: () => import(/* webpackChunkName: "Track"*/ "../Pages/Track"),
  loading: () => <Loading />
});

const EditEmployee = Loadable({
  loader: () => import(/* webpackChunkName: "EditEmployee"*/ "../Pages/EditEmployee"),
  loading: () => <Loading />
});



const MainRoute = props => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/item" component={ItemLibrary} />
      <Route exact path="/item/add" component={TambahItem} />
      <Route exact path="/item/detail/:id" component={ItemDetail} />
      <Route exact path="/edititem/:id" component={EditItem} />
      <Route exact path="/library/sales" component={Sales} />
      <Route exact path="/library/tambahsales" component={TambahSales} />
      <Route exact path="/category" component={CategoryItem} />
      <Route exact path="/tambahcategory" component={TambahCategory} />
      <Route exact path="/editcategory/:id" component={EditCategory} />
      <Route exact path="/packages" component={Packages} />
      <Route exact path="/tambahpackages" component={TambahPackages} />
      <Route exact path="/editpackages/:id" component={EditPackages} />
      <Route exact path="/qrcodeprint/:id" component={PrintQr} />
      <Route exact path="/packages/detail/:id" component={DetailPackages} />
      <Route exact path="/inventory/summary" component={Summary} />
      <Route exact path="/inventory/suppliers" component={Suppliers} />
      <Route exact path="/inventory/suppliers/editsupplier/:id" component={EditSupplier} />
      <Route exact path="/inventory/suppliers/tambahsupplier" component={TambahSupplier} />
      <Route exact path="/inventory/purchase_orders" component={PurchaseOrder} />
      <Route exact path="/inventory/purchase_orders/tambah_po" component={TambahPO} />
      <Route exact path="/inventory/adjustment" component={Adjustment} />
      <Route exact path="/inventory/adjustment/tambah_adjustment" component={TambahAdjustment} />
      <Route exact path="/customers/list" component={Customers} />
      <Route exact path="/customers/tambah_customer" component={TambahCustomer} />
      <Route exact path="/customers/editcustomers/:id" component={EditCustomers} />
      <Route exact path="/reports/sales/sales_summary" component={SalesSummary} />
      <Route exact path="/reports/sales/item_sales" component={ItemSales} />
      <Route exact path="/reports/sales/category_sales" component={CategorySales} />
      <Route exact path="/reports/transactions" component={Transactions} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/qrcode" component={GetQr} />
      <Route exact path="/profile/edit" component={EditProfile} />
      <Route exact path="/employees" component={Employees} />
      <Route exact path="/track" component={Track} />
      <Route exact path="/employees/tambah_employee" component={TambahEmployee} />
      <Route exact path="/employees/edit/:id" component={EditEmployee} />
      <Route exact path="/loading" component={Loading} />
      <Route component={NotMatch} />
    </Switch>
  );
};

export default MainRoute;