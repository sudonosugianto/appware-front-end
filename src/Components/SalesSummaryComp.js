import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class SalesSummaryComp extends Component {

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
                    <td>SUPPLIERS</td>
                    <td>SUPPLIERS</td>
                    <td>SUPPLIERS</td>
                  </tr>
                </>          
              );
            }
          }

export default withRouter(SalesSummaryComp);