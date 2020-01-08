import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import { withRouter } from 'react-router-dom'
import { connect } from "unistore/react";
import { actions } from "../store";
import "../App.css"

class DetailPackages extends Component {
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
            .get("http://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com:5000/api/users/packages/" + this.props.match.params.id, { headers })
            .then(response => {
                const data = response.data.package[0]
                self.setState({
                    // nama: data.nama,
                    item: data['Items.item'],
                    user: data['Users.fullname'],
                    category: data['Category.category'],
                    quantity: data.items_quantity,
                    packages_name: data.package_name,
                    created_at: data.created_at,
                    updated_at: data.updated_at
                })
                console.log('ayam', response.data.package[0])
            })
            .catch(function (error) {
                console.log(error);
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
                    <h4 className="text-center">Package Detail</h4>
                    <hr />
                    <div className='container'>
                        <div className='row row-center'>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Item Name</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Items Per Packages</th>
                                            <th scope="col ">Quantity</th>
                                            <th scope="col ">Create at</th>
                                            <th scope="col ">Updated at</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <td>{this.state.item}</td>
                                        <td>{this.state.category}</td>
                                        <td>{this.state.packages_name}</td>
                                        <td>{this.state.quantity}</td>
                                        <td>{this.state.created_at}</td>
                                        <td>{this.state.updated_at}</td>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-4 text-center"></div>
                            <div className="col-4 text-center">
                                <button type="submit" className="btn" style={{ marginRight: 10 }}><Link to='/packages'>Back</Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect("toggle, from, to, is_login, token", actions)(withRouter(DetailPackages))