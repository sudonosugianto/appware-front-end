import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import { withRouter } from 'react-router-dom'
import { connect } from "unistore/react";
import { actions } from "../store";
import "../App.css"
var QRCode = require('qrcode.react');


class PrintQr extends Component {
    state = {
        ListAdmin: [],
        // catID: "",
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
            .get("https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/track/" + this.props.match.params.id, { headers })
            .then(response => {
                const data = response.data
                self.setState({
                    id: data.id,
                    code: data.code,
                    PackagesItemID: data['packages.Items.id'],
                    item_name: data['packages.Items.item'],
                    packagesID: data['packages.id'],
                    packagesName: data['packages.package_name'],
                    po_id: data['po.id'],
                    suppliername: data['po.suppliers.name'],
                    poQty: data['po.quantity'],
                    salesID: data['sales.id'],
                    salesCustomerName: data['sales.customers.fullname'],
                    salesQTY: data['sales.quantity'],
                    updated_at: data.updated_at,
                    created_at: data.created_at,

                })

            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        const value = {

            packageSalesID: this.state.packagesID,
            itemID: this.state.PackagesItemID,
            code : this.state.code ,
            qty: this.state.poQty,
            created_at: this.state.created_at,
            nama_item: this.state.item_name,
            quantity: 1
        }
        return (

            <div className='container'>
                <div className='row'>
                    &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="col-md-3" >
                        <Link to='#' onClick={() => window.print()}  >
                            <QRCode size='256' value={JSON.stringify(value)} />
                        </Link>
                        <br></br>
                    </div>
                </div>
                <br></br>
                <div className="row">
                    <br></br>
                    <div className="col-xs-12 col-sm-4 col-md-5 col-lg-5">
                        <div className="table-responsive">
                            <table className="table" id="sales-summary-to-xls">
                                <tbody>
                                    <tr>
                                        <th>Code</th>
                                        <td>{this.state.code} </td>
                                    </tr>
                                    <tr>
                                        <th>Nama Item</th>
                                        <td>{this.state.item_name} @{this.state.packagesName}</td>
                                    </tr>
                                    <tr>
                                        <th>Item Quantity</th>
                                        <td>1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect("toggle, from, to, is_login, token", actions)(withRouter(PrintQr))