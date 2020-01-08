import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store";

// component Summary
class SummaryComp extends Component {
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
          <td>{this.props.packageName}</td>
          <td>{this.props.category}</td>
          <td>{this.props.PO}</td>
          <td>-{this.props.sales}</td>
          <td>{this.props.adjustment}</td>
          <td>{this.props.Ending}</td>      
        </tr>
      </>
    );
  }
}

export default connect("toggle, from, token, to, is_login", actions)(withRouter(SummaryComp))