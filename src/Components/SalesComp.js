import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

// Component for Sales
class CategorySalesComp extends Component {
    // converter
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
        return (
            <>
                <tr>
                    <td>{ this.props.customerSalesID}</td>
                    <td>{this.props.itemname} @{this.props.packagesname}</td>
                    <td>{this.props.category}   </td>
                    <td>{this.props.quantity}</td>
                    <td>{this.convertToRupiah(this.props.sellingPricePerPackage)}</td>
                    <td>{this.convertToRupiah( this.props.totalPrice)}</td>
                </tr>
            </>
        );
    }
}

export default withRouter(CategorySalesComp);