import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store";
import ModalDeleteSupplier from "../Pages/ModalDeleteSupplier"

// component for SuppliersComp
class SuppliersComp extends Component {
  render() {
    const route = '/inventory/suppliers/editsupplier/' + this.props.id
   return (
      <>
        <tr>
        <td>{this.props.name}</td>
          <td>{this.props.phone_number}</td>
          <td>{this.props.email}</td>
          <td>{this.props.address}</td>
          <td>{this.props.city}</td>
          <td className=" ">
            <Link className='fa fa-edit text-warning' to={route}></Link>
             &nbsp;&nbsp;
            <ModalDeleteSupplier name={this.props.id}/>
          </td>
        </tr>
      </>
    );
  }
}
export default connect("toggle,ListSupplier,token", actions)(withRouter(SuppliersComp))