import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store";

// conponent for customers
class CustomersComp extends Component {
  handleDelete = event => {
    event.preventDefault();    
    let token = localStorage.getItem("token");
    const url = "https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/customers/";
    const headers = {
      Authorization: "Bearer " + token
    };
      this.props.DeleteCustomers(url,this.props.id,headers).then( ()=> {
      this.props.getSuppliers(token)
      this.props.history.replace("/inventory/suppliers")
      })
    
  };
  render() {
    const route = '/customers/EditCustomers/' + this.props.id
   return (
      <>
        <tr>
          <td>{this.props.fullname}</td>
          <td>{this.props.phoneNumber}</td>
          <td>{this.props.email}</td>
          <td>{this.props.address}</td>
          <td>{this.props.city}</td>
        </tr>
      </>
    );
  }
}

export default connect("toggle,ListCustomers,token", actions)(withRouter(CustomersComp))