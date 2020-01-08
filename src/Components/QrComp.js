import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store";
var QRCode = require('qrcode.react');

// for QrCode Component
class QrComp extends Component {
  render() {
    const value = {
        packageSalesID: this.props.packageID ,
        itemID: this.props.packageitemID,
        package_name: this.props.packages ,
        qty : this.props.poQuantity,
        created_at : this.props.created_at,
        nama_item : this.props.nama_item,
        quantity : 1,
        code : this.props.code
      }
      const route2 = '/qrcodeprint/' + this.props.id
   return (
      <>
        <tr>
          <td>{this.props.code}</td>
          <td>{this.props.nama_item}</td>
          <td>{this.props.poSuppliers}</td>
          <td><Link to={route2}   rel={'noopener noreferrer'}   target={'_blank'}> <QRCode value= {JSON.stringify(value)} /> </Link></td>
                  
        </tr>
      </>
    );
  }
}

export default connect("toggle, from, token, to, is_login", actions)(withRouter(QrComp))