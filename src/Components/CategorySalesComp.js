import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
var QRCode = require('qrcode.react');

// component for category sales
class CategorySalesComp extends Component {
    //converter
    convertToRupiah(num) {
        if (num === undefined) {
            return "Rp xxx"
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
        const value = {
            id: this.props.id,
            qty: this.props.qty
        }
        
        return (
            <>
                <tr>
                    <td>{this.props.category}</td>
                    <td>{this.props.itemsStock}</td>
                    <td>{this.props.itemsSold}</td>
                    <td>{this.props.Assets}</td>
                    <td>{this.convertToRupiah( this.props.GSPC)}</td>
                    <td>{this.convertToRupiah( this.props.modalPerCategory)}</td>
                    <td>{this.convertToRupiah( this.props.margin)}</td>
                </tr>
            </>
        );
    }
}

export default withRouter(CategorySalesComp);