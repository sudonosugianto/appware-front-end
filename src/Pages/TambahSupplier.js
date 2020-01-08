import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import "../App.css"

import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";

const tambahAdmin = "http://52.77.222.248:8000/user/item";

class TambahSupplier extends Component {
  state = {
    ListAdmin: [],
    name: "",
    phone_number: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode :""
  };
  Handlefullname = event => {
    this.setState({ name: event.target.value });
  };
  HandlephoneNumber = event => {
    this.setState({ phone_number: event.target.value });
  };
  Handleemail = event => {
    this.setState({ email: event.target.value });
  };
  Handleaddress = event => {
    this.setState({ address: event.target.value });
  };
  Handlecity = event => {
    this.setState({ city: event.target.value });
  };
  Handlestate = event => {
    this.setState({ state: event.target.value });
  };
  Handlezipcode = event => {
    this.setState({ zipcode: event.target.value });
  };

  handlePost = event => {
    event.preventDefault();
    let token = this.props.token;
    console.log(token, "ss");
    const self = this;
    axios
      .post(
        "http://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/suppliers",
        {
          name: this.state.name,
          phone_number: this.state.phone_number,
          email: this.state.email,
          address: this.state.address,
          city: this.state.city,
          state: this.state.state,
          zipcode: this.state.zipcode
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )
      .then(result => {
        self.props.history.push("/inventory/suppliers");
        alert("success");
      })
      .catch(function(error) {
        console.log(error);
        alert("error");
      });
  };
  render() {
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
                <h4 className="text-center">Add Supplier</h4>
                <hr />
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-1 col-lg-3'></div>
                        <div className='card col-md-10 col-lg-6'>
                            <div className='card-body'>
                                <form className=' ' onSubmit={this.handlePost}>
                                    <div className="form-group ">
                                        <label for="inputAddress">Supplier Name</label>
                                        <input type="text" className="form-control"  onChange={this.Handlefullname} name='name'  placeholder="supplier name" />
                                    </div>
                                    <div className="form-row">
                                    <div className="form-group col-md-6">
                                            <label for="inputCity">Phone</label>
                                            <input type="text"  onChange={this.HandlephoneNumber} name='phone_number' placeholder='supplier phone number' className="form-control" required/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="inputCity">Email</label>
                                            <input type="email"  onChange={this.Handleemail} name='email' placeholder='supplier email address' className="form-control" required/>
                                        </div>
                                        
                                    </div>
                                    <div className='form-row'>
                                           <div className="form-group col-md-12">
                                            <label for="inputCity">Address</label>
                                            <input type="text"  onChange={this.Handleaddress} name='address' placeholder='supplier address' className="form-control" required/>
                                           </div>
                                    </div>
                                    
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label for="inputEmail4">City</label>
                                            <input type="text" className="form-control"  onChange={this.Handlecity} name='city' placeholder="ex: Malang" required/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label for="inputEmail4">State</label>
                                            <input type="text" className="form-control"  onChange={this.Handlestate} name='state'  placeholder="ex: Jawa Timur" required/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label for="inputPassword4">Zip Code</label>
                                            <input type="text" className="form-control" placeholder="supplier zip code"  onChange={this.Handlezipcode} name='zipcode'required/>
                                        </div>
                                    </div>
                                   
                                    <hr></hr>
                                    <div className="text-center">
                                        <Link to='/inventory/suppliers'>
                                            <button type="submit" className="btn" style={{marginRight: 10}}>
                                                Cancel
                                            </button>
                                        </Link>
                                        <button type="submit" className="btn btn-primary table-button">Add</button>
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
// export default TambahSupplier;
export default connect("toggle, is_login, token, from, to", actions)(withRouter(TambahSupplier))