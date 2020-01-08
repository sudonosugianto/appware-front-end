import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store";

// component for Sales
class ItemSalesComp extends Component {

    handleDelete = event => {
        this.setState({ id: event.target.value });
        let token = this.props.token;
        const self = this;
        const headers = {
            Authorization: "Bearer " + token
        };
        axios
            .delete("http://52.77.222.248:8000/user/item/" + event.target.name, {
                headers
            })
            .then(result => {
                alert("delete success");
                self.props.history.replace("/tambah");
            })
            .catch(function (error) {
                console.log(error);
                alert("error");
            });
    };
    render() {
        return (
            <>
                <tr>
                    <td>{this.props.itemName} @{this.props.packagename}</td>
                    <td>{this.props.categoryName}</td>
                    <td>{this.props.packageSold}</td>
                    <td>Rp. {this.props.netSales.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                    <td>Rp. {this.props.profit.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                </tr>
            </>
        );
    }
}
export default connect("toggle, from, to, token, is_login", actions)(withRouter(ItemSalesComp))