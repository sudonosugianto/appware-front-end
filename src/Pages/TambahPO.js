import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import "../App.css"

import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";

const tambahPackages = "http://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/packages";
const tambahSupp = "http://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/suppliers";

class TambahPO extends Component {
  state = {
    ListPackages : [],
    ListSuppliers : [],
    supplierID : '',
    packagePOID : '',
    quantity : '',
    notes:'',
    buyingPricePerPackage:''
  };
  componentDidMount = () => {
    const token = this.props.token;;
    const self = this;
    axios
      .get(tambahPackages, {
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
      .get(tambahSupp, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function(response) {
        // handle success
        self.setState({ ListSuppliers: response.data.supplier });
        // console.log("ambil result item", response.data.packages);
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
        "http://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/po",
        {
            supplierID: this.state.supplierID,
            packagePOID: this.state.packagePOID,
            quantity: this.state.quantity,
            notes : this.state.notes,
            buyingPricePerPackage: this.state.buyingPricePerPackage,

        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )
      .then(result => {
        self.props.history.push("/inventory/purchase_orders");
        console.log(result.data)
        alert("success");
      })
      .catch(function(error) {
        console.log(error);
        alert("error");
      });
  };
      
  HandleSuppId = event => {
    this.setState({ supplierID: event.target.value });
  };
  HandlePackID= event => {
    this.setState({ packagePOID: event.target.value });
  };
  HandleQuantity = event => {
    this.setState({ quantity: event.target.value });
  };
  HandleNotes = event => {
    this.setState({ notes: event.target.value });
  };
  HandleBuyingPrice = event => {
    this.setState({ buyingPricePerPackage: event.target.value });
  };

  render() {
    const  ListPackages  = this.state.ListPackages;
    const  ListSuppliers  = this.state.ListSuppliers;
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
                <h4 className="text-center">Create Purchase Order </h4>
                <hr />
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-1 col-lg-3'></div>
                        <div className='card col-md-10 col-lg-6'>
                            <div className='card-body'>
                                <form className=' ' onSubmit={this.handlePost}>
                                     <div className="form-group">
                                        <label for="inputState">Package Name</label>
                                        <select id="inputState" className="form-control" onChange={this.HandlePackID}>
                                            <option selected>choose...</option>
                                            {
                                                ListPackages.map((item, key) => {
                                                return  <option value={item.id}  >{item['Items.item']} @{item.package_name} </option>
                                                
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label for="inputState">Supplier</label>
                                        <select id="inputState" className="form-control" onChange={this.HandleSuppId}>
                                            <option selected>choose...</option>
                                            {
                                                ListSuppliers.map((item, key) => {
                                                return  <option  value={item.id} > {item.name} </option>
                                                
                                                })
                                            }
                                        </select>
                                    </div>
                                    
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label for="inputEmail4">Order</label>
                                            <input type="text" className="form-control"  name='quantity' onChange={this.HandleQuantity} placeholder="order quantity"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="inputPassword4">Unit Cost</label>
                                            <input type="text" className="form-control" name='buyingPricePerPackage' onChange={this.HandleBuyingPrice} placeholder="unit cost"/>
                                        </div>
                                    </div>                                    
                                    <div className="form-group">
                                        <label for="inputNotes">Notes</label>
                                        <textarea type="text" name='notes' onChange={this.HandleNotes} className="form-control" placeholder="put  notes here"/>
                                    </div>
                                    <div className="text-center">
                                        <Link to='/inventory/purchase_orders'>
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
// export default TambahPO;
export default connect("toggle, from, to, is_login, token", actions)(withRouter(TambahPO))