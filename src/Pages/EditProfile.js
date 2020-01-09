import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import "../App.css"

import { withRouter } from 'react-router-dom'
import { connect } from "unistore/react";
import { actions } from "../store";

const getUser = "https://appware.halte.id/api/users";
class EditProfile extends Component {
    state = {
        fullname: '',
        username: '',
        email: '',
        phone_number: '',
        password: '',
        id: ''
    }
    Handlefullname = event => {
        this.setState({ fullname: event.target.value });
    };

    Handleusername = event => {
        this.setState({ username: event.target.value });
    };

    Handleemail = event => {
        this.setState({ email: event.target.value });
    };

    Handlephone_number = event => {
        this.setState({ phone_number: event.target.value });
    };
    Handlepassword = event => {
        this.setState({ password: event.target.value });
    };
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
                    id: response.data.user[0].id,
                    fullname: response.data.user[0].fullname,
                    username: response.data.user[0].username,
                    email: response.data.user[0].email,
                    phone_number: response.data.user[0].phone_number,
                    password: response.data.user[0].password
                });
                console.log("ambil result item", response.data.user[0]);
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    handlePut = event => {
        event.preventDefault();
        let token = this.props.token;
        console.log(token, "ss");
        const self = this;
        let body = {
            fullname: this.state.fullname,
            phone_number: this.state.phone_number,
            password: this.state.password
        }
        console.log(body)
        axios
            .put(
                "https://appware.halte.id/api/users/" + this.state.id,
                body,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            )
            .then(result => {
                self.props.history.push("/profile");
                alert("success");
            })
            .catch(function (error) {
                console.log(error);
                alert("error");
            });
    };

    render() {
        return (
            <div className='wrapper'>
                <DashNav toggle={this.props.toggle} />
                <div id="content">
                    <div className="container" style={{ margin: 0 }}>
                        <button type="button" id="sidebarCollapse" className="btn table-button" onClick={() => this.props.switchToggle()}>
                            <i className="fa fa-chevron-left strong"
                                className={this.props.toggle ? ' fa fa-chevron-left strong rotate down' : 'fa fa-chevron-right strong rotate up'}
                            />
                        </button>
                    </div>
                    <br />
                    <br />
                    {/* Main Content */}
                    <h4 className="text-center">Edit Profile</h4>
                    <hr />
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-1 col-lg-3'></div>
                            <div className='card col-md-10 col-lg-6'>
                                <div className='card-body'>
                                    <form className=' ' onSubmit={this.handlePut}>

                                        <div className="form-group">
                                            <label for="inputPassword4">Name</label>
                                            <input type="text" className="form-control"
                                                onChange={this.Handlefullname} name='actual_stock'
                                                placeholder=" name" value={this.state.fullname} />
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <fieldset disabled>
                                                    <label for="inputPassword4">Username</label>
                                                    <input type="text" className="form-control" placeholder="" onChange={this.Handleusername} value={this.state.username} />
                                                </fieldset>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label for="inputPassword4">Password</label>
                                                <input type="password" className="form-control"
                                                    onChange={this.Handlepassword} name='actual_stock'
                                                    placeholder=" password" value={this.state.password} />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label for="inputPassword4">Phone</label>
                                                <input type="text" className="form-control"
                                                    onChange={this.Handlephone_number} name='actual_stock'
                                                    placeholder=" number"
                                                    value={this.state.phone_number} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <fieldset disabled>
                                                    <label for="inputPassword4">Email</label>
                                                    <input type="email" className="form-control" placeholder=" email" onChange={this.Handleemail} value={this.state.email} />
                                                </fieldset>
                                            </div>
                                        </div>

                                        <hr></hr>
                                        <div className="text-center">
                                            <Link to='/profile'>
                                                <button type="submit" className="btn" style={{ marginRight: 10 }}>
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
export default connect("toggle, from, to, is_login, token", actions)(withRouter(EditProfile))