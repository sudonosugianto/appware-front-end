import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import '../App.css'

import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";

const tambahAdmin = "http://52.77.222.248:8000/user/item";
const getAllItem = "https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/category";

class TambahItem extends Component {
  state = {
    ListAdmin: [],
    catID: "",
    item: "",
    picture: "",
    size: "",
    unit: "",
    SKU: ""
  };
  HandlecatID = event => {
    this.setState({ catID: event.target.value });
  };
  HandleItem = event => {
    this.setState({ item: event.target.value });
  };
  HandlePicture = event => {
    this.setState({ picture: event.target.value });
  };
  HandleSize = event => {
    this.setState({ size: event.target.value });
  };
  HandleUnit = event => {
    this.setState({ unit: event.target.value });
  };
  HandleSKU = event => {
    this.setState({ SKU: event.target.value });
  };
  componentWillMount = () => {
    const token = this.props.token;;
    const self = this;
    axios
      .get(getAllItem, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function(response) {
        // handle success
        self.setState({ ListAdmin: response.data.category });
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
        "https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/item",
        {
          item: this.state.item,
          picture: this.state.picture,
          unit: this.state.unit,
          size: this.state.size,
          SKU: this.state.SKU,
          catID: this.state.catID
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )
      .then(result => {
        self.props.history.push("/item");
        alert("success");
      })
      .catch(function(error) {
        console.log(error);
        alert("error");
      });
  };
  render() {
    const  ListAdmin  = this.state.ListAdmin;
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
                <h4 className="text-center">Add Item </h4>
                <hr />
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-1 col-lg-3'></div>
                        <div className='card col-md-10 col-lg-6'>
                            <div className='card-body'>
                                <form className=' ' onSubmit={this.handlePost}>
                                    <div className="form-group ">
                                        <label for="inputAddress">Item Name</label>
                                        <input type="text" className="form-control" id='item_name' onChange={this.HandleItem} name='item'  placeholder="item name" required/>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label for="inputState">Category</label>
                                            <select  onChange={this.HandlecatID}  id="cat_val" className="form-control">
                                                <option selected>choose...</option>
                                                {
                                               
                                                ListAdmin.map((item, key) => {
                                                return  <option value={item.id} name={item.id} >{item.category} </option>
                                                })
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="inputPassword4">Price</label>
                                            <input type="text" id='price' className="form-control" required placeholder="item price" onChange={this.HandleSKU} name='SKU'/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label for="inputEmail4">Size</label>
                                            <input type="text" id='size' className="form-control"  onChange={this.HandleSize} name='size' placeholder="ex: 500" required/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="inputEmail4">Unit</label>
                                            <input type="text" id='unit' className="form-control"  onChange={this.HandleUnit} name='unit'  placeholder="gram/kg/ons" required/>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="text-center">
                                        <Link to='/item'>
                                          <button type="submit" className="btn" style={{marginRight: 10}}>
                                            Cancel
                                          </button>
                                        </Link>
                                        <button type="submit" id='button_item' className="btn btn-primary table-button">Add</button>
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
// export default TambahItem;
export default connect("toggle, from, to, is_login, token", actions)(withRouter(TambahItem))