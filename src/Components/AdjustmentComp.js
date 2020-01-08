import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import moment from 'moment'
var QRCode = require('qrcode.react');

// component for adjustment
class AdjustmentComp extends Component {

  handleDelete = event => {
    this.setState({ id: event.target.value });
    let token = localStorage.getItem("token");
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
    const value = {
      id: this.props.id,
      qty: this.props.qty 
    }

   return (
      <>
        <tr>
          <td>{moment(this.props.created_at).format("MMM Do")}</td>
          <td>{this.props.item_name} @ {this.props.package_name}</td>
          <td>{this.props.actual_stock}</td>
          <td>{this.props.notes}</td>
         
        </tr>
      </>
    );
  }
}

export default withRouter(AdjustmentComp);