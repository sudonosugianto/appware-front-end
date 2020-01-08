import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import moment from 'moment'

// component for Transactions
class TransactionsComp extends Component {
  convertToRupiah(num) {
    if (num === undefined) {
        return ""
    }
    var rupiah = '';
    var angkarev = num.toString().split('').reverse().join('');
    for (var i = 0; i< angkarev.length; i++){
      if ( i%3 === 0) {
        rupiah += angkarev.substr(i,3)+'.'
      }
    }
    return 'Rp '+rupiah.split('',rupiah.length-1).reverse().join('');
  }

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

   return (
      <>
        <tr>
          <td>{moment(this.props.createdAt).format("MMM Do")}</td>
          <td>{this.convertToRupiah(this.props.sellingPricePerPackage) ? <span className="badge badge-danger">OUT</span>  : <span className="badge badge-success">IN</span> }</td>
          <td> {this.props.suppliersname  ?  this.props.suppliersname  : this.props.name }
          </td>
          <td>{this.props.name_item} @{this.props.package_name}</td>
          <td>{this.props.quantity}</td>
          <td> { this.convertToRupiah(this.props.buyingPricePerPackage)  ?  this.convertToRupiah(this.props.buyingPricePerPackage)  : '-' }
          </td>
          <td>{this.convertToRupiah(this.props.sellingPricePerPackage) ? this.convertToRupiah(this.props.sellingPricePerPackage)  : '-' }</td>
          <td> {this.convertToRupiah(this.props.totalPrice)}</td>

       </tr>
      </>
    );
  }
}

export default withRouter(TransactionsComp);