import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import '../App.css'
import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";

const getAllItem = "https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/item";

class TambahPackages extends Component {
  state = {
    ListAdmin: [],
    itemID:"",
	package_name:"",
	items_quantity:""
  };
  componentDidMount = () => {
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
        self.setState({ ListAdmin: response.data.item });
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
        "https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/packages",
        {
          itemID: this.state.itemID,
          package_name: this.state.package_name,
          items_quantity: this.state.items_quantity,
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )
      .then(result => {
        self.props.history.push("/packages");
        alert("success");
      })
      .catch(function(error) {
        console.log(error);
        alert("error");
      });
  };
  HandleitemID = event => {
    this.setState({ itemID: event.target.value });
  };
  HandlePackagesName = event => {
    this.setState({ package_name: event.target.value });
  };
  HandleitemQuantity = event => {
    this.setState({ items_quantity: event.target.value });
  };
  
  render() {
    const  ListAdmin  = this.state.ListAdmin;
    
    console.log('hasil',ListAdmin)
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
                <h4 className="text-center">Create Package</h4>
                <hr />
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-1 col-lg-3'></div>
                        <div className='card col-md-10 col-lg-6'>
                            <div className='card-body'>
                                <form className=' ' onSubmit={this.handlePost}>
                                        <div className="form-group">
                                            <label for="inputState">Item</label>
                                            <select  onChange={this.HandleitemID}  id="inputState" className="form-control">
                                                <option>choose...</option>
                                            {
                                                ListAdmin.map((item, key) => {
                                                return  <option value={item.id} name={item.id} >{item.item} </option>
                                                
                                                })
                                            }
                                            </select>
                                        </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label for="inputCity">Package</label>
                                            <input type="text"  onChange={this.HandlePackagesName} placeholder='ex: lusin / etc..' name='package_name' className="form-control" required />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="inputCity">Quantity</label>
                                            <input type="text"  onChange={this.HandleitemQuantity} name='items_quantity' placeholder='ex: 78' className="form-control" required/>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="text-center">
                                    <Link to='/packages'>
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
// export default TambahPackages;
export default connect("toggle, from, to, is_login, token", actions)(withRouter(TambahPackages))