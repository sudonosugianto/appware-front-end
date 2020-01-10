import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import TransactionsComp from "../Components/TransactionsComp"
import ReactToExcel from "react-html-table-to-excel"
import '../App.css'
import profile from "../Assets/profile.jpg"
import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";
import moment from 'moment'

const getUser = "https://appware-api.halte.id/api/users";

class Profile extends Component {

    state = {
        fullName: '',
        userName: '',
        email: '',
        phone: '',
        createdAt: ''
    }

    componentDidMount = () => {
        const token = this.props.token;
        const self = this;
        axios
            .get(getUser, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(function (response) {
                // handle success
                self.setState({ 
                    fullName: response.data.user[0].fullname,
                    userName: response.data.user[0].username,
                    email: response.data.user[0].email,
                    phone: response.data.user[0].phone_number,
                    createdAt: response.data.user[0].created_at
                 });
                console.log("ambil result item", response.data.user[0]);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        return (
            <div className="wrapper">
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
                    <div className="text-center">
                        <h3>My Profile</h3>
                    </div>
                    <hr/>
                    <br></br>
                    <div className='container'>
                        <div className='row'>
                            <div className="col-xs-12 col-sm-12 col-md-1 col-lg-3"></div>
                            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-6">
                                
                                <div className="row row-center">
                                    <div className="col-xs-12 col-sm-1"></div>
                                    <div className="col-xs-12 col-sm-5 profile-row" style={{padding: 0}}>
                                        <img className="card-img-top" src={profile}></img>       
                                        <div className="overlay">
                                            <Link to="/profile/edit" className="icon">
                                                <i class="fas fa-edit"></i>
                                            </Link>
                                        </div>                                        
                                    </div>
                                    <div className="col-xs-12 col-sm-6" style={{paddingLeft: 30}}>
                                        <div style={{marginBottom: 20, marginTop: 12}}>
                                            <h4 className="title-align">@{this.state.userName}</h4>
                                        </div>
                                        <p><i className="fas fa-id-card-alt" style={{marginRight: 20}}></i>{this.state.fullName}</p>
                                        <p><i className="fas fa-phone" style={{marginRight: 20}}></i>{this.state.phone}</p>
                                        <p><i className="fas fa-envelope" style={{marginRight: 20}}></i>{this.state.email}</p>
                                        <p><i className="fas fa-business-time" style={{marginRight: 20}}></i>{moment(this.state.createdAt).format("MMM Do YYYY")}</p>
                                    </div>
                                    
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
// export default Profile;
export default connect("toggle, from, to, is_login, token", actions)(withRouter(Profile))