import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import "../App.css"
import { withRouter } from 'react-router-dom'
import { connect } from "unistore/react";
import { actions } from "../store";

// local
class EditCategory extends Component {
    state = {
        ListAdmin: [],

        Category: ""
    };
    componentDidMount = () => {
        const self = this;
        const id = this.props.match.params.id;
        const token = this.props.token;
        const headers = {
            Authorization: "Bearer " + token
        };
        axios
            .get("http://ec2-54-255-236-0.ap-southeast-1.compute.amazonaws.com/api/users/category/" + this.props.match.params.id, { headers })
            .then(response => {
                const data = response.data.category
                self.setState({
                    category: data.category,
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    HandleCategory = event => {
        this.setState({ category: event.target.value });
    };

    handlePost = event => {
        event.preventDefault();
        let token = this.props.token;
        const id = this.props.match.params.id
        const self = this;
        axios
            .put(
                "http://ec2-54-255-236-0.ap-southeast-1.compute.amazonaws.com/api/users/category/" + id,
                {
                    category: this.state.category
                },
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            )
            .then(result => {
                self.props.history.push("/category");
                alert("Update Category berhasil!");
            })
            .catch(function (error) {
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
                    <h4 className="text-center">Edit Category </h4>
                    <hr />
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-1 col-lg-3'></div>
                            <div className='card col-md-10 col-lg-6'>
                                <div className='card-body'>
                                    <form className=' ' onSubmit={this.handlePost}>
                                        <div className="form-group">
                                            <label for="inputNotes">Category</label>
                                            <input type="text" value={this.state.category} name="category" onChange={(e) => this.HandleCategory(e)} className="form-control" />
                                        </div>
                                        <hr></hr>
                                        <div className="text-center">
                                            <Link to='/category'>
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
// export default EditCategory;
export default connect("toggle, from, to, token, is_login", actions)(withRouter(EditCategory))