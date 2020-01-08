import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import '../App.css'
import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";

class EditItem extends Component {
    state = {
    ListAdmin: [],
    item: "",
    picture: "",
    size: "",
    unit: "",
    SKU: ""
      };
    
    componentDidMount = () => {
    const self = this;
    const id = this.props.match.params.id;
    const token = this.props.token;
    const headers = {
        Authorization: "Bearer " + token
    };
    axios
        .get("http://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com:5000/api/users/item/" + this.props.match.params.id,{headers})
        .then(response => {
        const data = response.data.item[0]
        self.setState({ 
            item: data.item,
            picture: data.picture,
            unit: data.unit,
            size: data.size,
            SKU: data.SKU,
            category: data['Category.category']
        })      
        console.log('ayam',response.data.item)
        })
        .catch(function(error) {
        console.log(error);
        });
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

    handlePost = event => {
    event.preventDefault();
    let token = this.props.token;
    const id = this.props.match.params.id
    const self = this;
    axios
        .put(
        "http://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com:5000/api/users/item/" + id,
        {
            item: this.state.item,
            picture: this.state.picture,
            unit: this.state.unit,
            size: this.state.size,
            SKU: this.state.SKU,
            // catID: this.state.catID
        },
        {
            headers: {
            Authorization: "Bearer " + token
            }
        }
        )
        .then(result => {
        self.props.history.push("/item");
        alert("Update barang berhasil!");
        })
        .catch(function(error) {
        console.log(error);
        alert("error");
        });
    };
    
  render() {
    const ListAdmin = this.state.ListAdmin;
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
                <h4 className="text-center">Edit Item </h4>
                <hr />
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-1 col-lg-3'></div>
                        <div className='card col-md-10 col-lg-6'>
                            <div className='card-body'>
                            <form className=' ' onSubmit={this.handlePost}>
                                    <div className="form-group ">
                                        <label for="inputAddress">Item Name</label>
                                        <input type="text" className="form-control"  value={this.state.item} onChange={this.HandleItem} name='item'  placeholder="item name"/>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label for="inputState">Category</label>
                                            <select  onChange={this.HandlecatID}  className="form-control">
                                                <option selected>{this.state.category}</option>
                                                {/* <option name='1' value='1'>Uncategories</option> */}
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="inputPassword4">Price</label>
                                            <input type="text" className="form-control" value={this.state.SKU} placeholder="item price" onChange={this.HandleSKU} name='SKU'/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label for="inputEmail4">Size</label>
                                            <input type="text" className="form-control"   value={this.state.size} onChange={this.HandleSize} name='size' placeholder="ex: 500"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="inputEmail4">Unit</label>
                                            <input type="text" className="form-control"   value={this.state.unit} onChange={this.HandleUnit} name='unit'  placeholder="gram/kg/ons"/>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="text-center">
                                        <Link to='/item'>
                                          <button type="submit" className="btn" style={{marginRight: 10}}>
                                            Cancel
                                          </button>
                                        </Link>
                                        <button type="submit" className="btn btn-primary table-button">Update</button>
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
export default connect("toggle, from, to, is_login, token", actions)(withRouter(EditItem))