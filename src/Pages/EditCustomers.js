import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import "../App.css"
import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";

// local
class EditCustomers extends Component {
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
    this.setState({ fullname: event.target.value });
  };
  HandlephoneNumber = event => {
    this.setState({ phoneNumber: event.target.value });
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

  componentDidMount = () => {
    const self = this;
    const id = this.props.match.params.id;
    const token = this.props.token;
    const headers = {
        Authorization: "Bearer " + token
    };
    axios
        .get("https://appware-api.halte.id/api/users/customers/" + this.props.match.params.id,{headers})
        .then(response => {
        const data = response.data.customer[0]
        self.setState({ 
          fullname: data.fullname,
          phoneNumber : data.phoneNumber,
          email: data.email,
          address : data.address,
          city : data.city,
          state: data.state,
          zipcode : data.zipcode
        })      
        console.log('ayam',response.data.customer)   
        })
        .catch(function(error) {
        console.log(error);
        });
    };
    handlePost = event => {
      event.preventDefault();
      let token = this.props.token;
      const id = this.props.match.params.id
      const self = this;
      axios
          .put(
          "https://appware-api.halte.id/api/users/customers/" + id,
          {
            fullname: this.state.fullname,
            phoneNumber: this.state.phoneNumber,
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
          self.props.history.push("/customers/list");
          alert("Update Customers berhasil!");
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
                <h4 className="text-center">Edit Customer</h4>
                <hr />
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-1 col-lg-3'></div>
                        <div className='card col-md-10 col-lg-6'>
                            <div className='card-body'>
                                <form className=' ' onSubmit={this.handlePost}>
                                    <div className="form-group ">
                                        <label for="inputAddress">Full Name</label>
                                        <input type="text" className="form-control" value={this.state.fullname} onChange={this.Handlefullname} name='name'  placeholder=" name"/>
                                    </div>
                                    <div className="form-row">
                                    <div className="form-group col-md-6">
                                            <label for="inputCity">Phone</label>
                                            <input type="text"  onChange={this.HandlephoneNumber} value={this.state.phoneNumber} name='phone_number' placeholder=' phone number' className="form-control" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="inputCity">Email</label>
                                            <input type="email"  onChange={this.Handleemail} value={this.state.email} name='email' placeholder=' email address' className="form-control" />
                                        </div>
                                        
                                    </div>
                                    <div className='form-row'>
                                           <div className="form-group col-md-12">
                                            <label for="inputCity">Address</label>
                                            <input type="text"  onChange={this.Handleaddress} value={this.state.address} name='address' placeholder=' address' className="form-control" />
                                           </div>
                                    </div>
                                    
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label for="inputEmail4">City</label>
                                            <input type="text" className="form-control"  value={this.state.city} onChange={this.Handlecity} name='city' placeholder="ex: Malang"/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label for="inputEmail4">State</label>
                                            <input type="text" className="form-control"  value={this.state.state} onChange={this.Handlestate} name='state'  placeholder="ex: Jawa Timur"/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label for="inputPassword4">Zip Code</label>
                                            <input type="text" className="form-control" value={this.state.zipcode} placeholder=" zip code"  onChange={this.Handlezipcode} name='zipcode'/>
                                        </div>
                                    </div>
                                   
                                    <hr></hr>
                                    <div className="text-center">
                                        <Link to='/customers/list'>
                                            <button className="btn" style={{marginRight: 10}}>
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
export default connect("toggle, from, to, is_login, token", actions)(withRouter(EditCustomers))