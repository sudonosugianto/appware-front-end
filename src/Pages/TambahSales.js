import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import "../App.css"
import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";
import swal from 'sweetalert2';
// import QrCode from "../Components/QrCode";
import QrReader from 'react-qr-scanner'
var QRCode = require('qrcode.react');


const getAllPackages = "https://appware.halte.id/api/users/packages";
const getAllCustomers = "https://appware.halte.id/api/users/customers";


class TambahSales extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 500,
      result: 'No result',
      ListPackages: [],
      ListCustomers: [],
      customerSalesID:"",
      packageSalesID:"",
      quantity:"",
      sellingPricePerPackage:'',
      myObject : '',
      nama_item : '',
    
    }
    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    this.setState({
      result: data,
    })
  }

  handleError(err){
    console.error(err)
  }

 
  componentDidMount = () => {
    const token = this.props.token;;
    const self = this;
    
    axios
      .get(getAllPackages, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function(response) {
        // handle success
        self.setState({ ListPackages: response.data.packages });
        console.log("ambil result item", response.data.packages);
      })
      .catch(function(error) {
        console.log(error);
      });

      axios
      .get(getAllCustomers, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function(response) {
        // handle success
        self.setState({ ListCustomers: response.data.customers });
        // console.log("ambil result item", response.data.user);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  
  handlePost = event => {
    event.preventDefault();
    let token = this.props.token;
    // console.log(token, "ss");
    const self = this;
    axios
      .post(
        "https://appware.halte.id/api/users/sales",
        {
          customerSalesID: self.state.customerSalesID,
          packageSalesID: self.state.packageSalesID,
          
          quantity: self.state.quantity,
          sellingPricePerPackage: self.state.sellingPricePerPackage,
        
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )
      .then(result => {
        self.props.history.push("/library/sales");
        alert("success");
      })
      .catch(function(error) {
        console.log(error);
        alert("error");
      });
  };
  customerSalesID = event => {
    this.setState({ customerSalesID : event.target.value });
  };
  packageSalesID = event => {
    this.setState({ packageSalesID : event.target.value });
  };
  quantity = event => {
    this.setState({ quantity : event.target.value });
  };
  sellingPricePerPackage = event => {
    this.setState({ sellingPricePerPackage : event.target.value });
  };

  
  render() {

    let handleObject = this.state.result;
    // menemukan qrcode
    if (handleObject !== 'No result' && handleObject !== null && this.state.delay != false)
      {
        const hasil_object = JSON.parse(handleObject);
        this.setState({
          quantity : hasil_object.quantity,
          packageSalesID : hasil_object.packageSalesID,
          nama_item : hasil_object.nama_item,
          delay : false
        }
        )
        swal({
          title: 'Scan Success !',
          showConfirmButton: false,
          timer: 2000
        })
      }
    
    // console.log('bismillah',this.state.result)
      const  ListPackages  = this.state.ListPackages;
      const  ListCustomers  = this.state.ListCustomers;
      const previewStyle = {
          height: '50%',
          width: '100%' 
        }  
      
     
  
    
    // console.log('hasil',ListPackages)
    return (
        <div className='wrapper'>
            <DashNav toggle={this.props.toggle} />
            <div id="content">
              <div className="container" style={{margin: 0}}>
                    <button type="button" id="sidebarCollapse" className="btn table-button" onClick={() => this.props.switchToggle() }>
                        <i className="fa fa-chevron-left strong" 
                            className={this.props.toggle ? ' fa fa-chevron-left strong rotate down': 'fa fa-chevron-right strong rotate up'}
                        />
                    </button>
                </div>
                <br/>
                <br/>
                {/* Main Content */}
                <h4 className="text-center">Create Sale</h4>
                <hr />
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-1 col-lg-3'></div>
                        <div className='card col-md-10 col-lg-6'>
                            <div className='card-body'>
                                  <div className='text-center' style={{margin: "5%"}}>

                                   <QrReader
                                        delay={this.state.delay}
                                        style={previewStyle}
                                        onError={this.handleError}
                                        onScan={this.handleScan}
                                        />
                                  <br/>
                                  <p style={{fontWeight: 700}}>Scan Package QR Code</p>   
                                  </div>
                                  <hr/>     
                                <form className=' ' onSubmit={this.handlePost}>
                                        <div className="form-group">
                                            <label for="inputState">Customer</label>
                                            <select   id="inputState" className="form-control" onChange={this.customerSalesID}  >
                                                <option>choose...</option>
                                                {
                                                ListCustomers.map((item, key) => {
                                                    return  <option value={item.id} > {item.fullname}</option>
                                                
                                                })
                                            }
                                            
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label for="inputState">Package</label>
                                            <select   id="inputState" className="form-control"   onChange={this.packageSalesID}>
                                                <option value={this.state.packageSalesID}>{this.state.nama_item}</option>
                                                {
                                                ListPackages.map((item, key) => {
                                                return  <option value={item.id} >{item['Items.item']} @{item.package_name}</option>
                                                
                                                })
                                            }
                                            </select>
                                        </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label for="inputCity">Quantity</label>
                                            <input type="text" value={this.state.quantity}  onChange={this.quantity} placeholder='quantity' name='quantity' className="form-control" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="inputCity">Price </label>
                                            <input type="text" value={this.state.sellingPricePerPackage} onChange={this.sellingPricePerPackage} name='sellingPricePerPackage' placeholder='price per packages' className="form-control" />
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="text-center">
                                        <Link to='/library/sales'>
                                          <button type="submit" className="btn" style={{marginRight: 10}}>
                                            Cancel
                                          </button>
                                        </Link>
                                        <button type="submit" className="btn btn-primary table-button">Create</button>
                                    </div>
                                </form>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
// export default TambahSales;
export default connect("toggle, from, to, is_login, token", actions)(withRouter(TambahSales))