import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import "../App.css"
import { withRouter } from 'react-router-dom'
import { connect } from "unistore/react";
import { actions } from "../store";

// local
class EditEmployee extends Component {
    state = {
        ListAdmin: [],
        fullname: "",
        phone_number: "",
        email: "",
        username: "",
        subuser_type: "",
    };
    Handlefullname = event => {
        this.setState({ fullname: event.target.value });
    };
    Handlephone_number = event => {
        this.setState({ phone_number: event.target.value });
    };
    Handleemail = event => {
        this.setState({ email: event.target.value });
    };
    Handleusername = event => {
        this.setState({ username: event.target.value });
    };
    Handlesubuser_type = event => {
        this.setState({ subuser_type: event.target.value });
    };

    Handlestate = event => {
        this.setState({ state: event.target.value });
    };

    componentDidMount = () => {
        const self = this;
        const token = this.props.token;
        const headers = {
            Authorization: "Bearer " + token
        };
        axios
            .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/subusers/" + this.props.match.params.id, { headers })
            .then(response => {
                const data = response.data.subuser[0]
                self.setState({
                    fullname: data.fullname,
                    phone_number: data.phone_number,
                    email: data.email,
                    username: data.username,
                    subuser_type: data.subuser_type,
                })
                console.log('ayam', response.data.subuser[0])
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    handlePost = event => {
        event.preventDefault();
        let token = this.props.token;
        // console.log(token, "sss");
        const id = this.props.match.params.id
        const self = this;
        axios
            .put(
                "https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/subusers/" + id,
                {
                    fullname: this.state.fullname,
                    phone_number: this.state.phone_number,
                    email: this.state.email,
                    username: this.state.username,
                    subuser_type: this.state.subuser_type,
                },
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            )
            .then(result => {
                self.props.history.push("/employees");
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
                    <h4 className="text-center">Edit Employee</h4>
                    <hr />
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-1 col-lg-3'></div>
                            <div className='card col-md-10 col-lg-6'>
                                <div className='card-body'>
                                    <form className=' ' onSubmit={this.handlePost}>
                                        <div className="form-group ">
                                            <label for="inputAddress">Name</label>
                                            <input type="text" className="form-control" onChange={this.Handlefullname} name='fullname' placeholder="employee name" value={this.state.fullname} />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <fieldset disabled>
                                                    <label for="inputCity">Username</label>
                                                    <input type="text" onChange={this.Handleusername} name='username' placeholder='employee username' className="form-control" value={this.state.username} />
                                                </fieldset >
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label for="inputCity">Role</label>
                                                <input type="text" onChange={this.Handlesubuser_type} name='subuser_type' placeholder='employee role' className="form-control" value={this.state.subuser_type} />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label for="inputCity">Phone</label>
                                                <input type="text" onChange={this.Handlephone_number} name='phone_number' placeholder='employee phone number' className="form-control" value={this.state.phone_number} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <fieldset disabled>
                                                    <label for="inputCity">Email</label>
                                                    <input type="email" onChange={this.Handleemail} name='email' placeholder='employee email address' className="form-control" value={this.state.email} />
                                                </fieldset>
                                            </div>
                                        </div>


                                        <hr></hr>
                                        <div className="text-center">
                                            <Link to='/employees'>
                                                <button className="btn" style={{ marginRight: 10 }}>
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
export default connect("toggle, from, to, token, is_login", actions)(withRouter(EditEmployee))