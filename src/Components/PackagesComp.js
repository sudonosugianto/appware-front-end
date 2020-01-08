import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store";
import ModalDeletePackage from "../Pages/ModalDeletePackage"
var QRCode = require('qrcode.react');

// component for Packages
class PackagesComp extends Component {
  render() {
    const value = {
      packageSalesID: this.props.id ,
      itemID: this.props.itemID,
      package_name: this.props.package_name ,
      qty : this.props.qty,
      created_at : this.props.created_at,
      nama_item : this.props.nama_item,
      quantity : 1
    }
    const route = '/editpackages/' + this.props.id
    const route1 = '/packages/detail/' + this.props.id
    const route2 = '/qrcodeprint/' + this.props.id
    
   return (
      <>
        <tr>
          <td><Link to={route1}>{this.props.item}</Link></td>
          <td>{this.props.category}</td>
          <td>{this.props.packages_name}</td>
          <td>{this.props.qty}</td>
          <td className="">
            <Link className='fa fa-edit text-warning' to={route}></Link>
             &nbsp;&nbsp;
             <ModalDeletePackage name={this.props.id}/>
          </td>
       
        </tr>
      </>
    );
  }
}
export default connect("toggle,ListPackages,token", actions)(withRouter(PackagesComp))