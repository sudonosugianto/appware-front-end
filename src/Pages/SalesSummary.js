import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import SummaryComp from "../Components/SummaryComp"
import SalesSummaryComp from "../Components/SalesSummaryComp";
import ReactToExcel from "react-html-table-to-excel"
import '../App.css'
import ModalDatePicker from "../Pages/ModalDatePicker"

import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";

const getallSalesSummary = "http://ec2-54-255-236-0.ap-southeast-1.compute.amazonaws.com/api/users/transactionssummary";

class SalesSummary extends Component {
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
      state = {
          ListSummarySales: [],
        };
        componentDidMount = () => {
            const token = this.props.token;
            const self = this;
            axios
            .get(getallSalesSummary, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(function (response) {
                // handle success
                self.setState({ ListSummarySales: response.data });
               
                console.log("ambil result item", response.data)
                
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    render() {
        const { ListSummarySales } = this.state;
        return (
            
            <div className="wrapper">
                <DashNav toggle={this.props.toggle} />
				<div id="content">
                    <div className="container" style={{margin: 0}}>
                        <button type="button" id="sidebarCollapse" className="btn table-button" onClick={() => this.props.switchToggle() }>
                            <i className="fa fa-chevron-left strong" 
                                className={this.props.toggle ? ' fa fa-chevron-left strong rotate down': 'fa fa-chevron-right strong rotate up'}
                            />
                        </button>
                    </div>
					<br/>
					<br/>
                    {/* Main Content */}
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 title-align" style={{marginBottom: 10}}>
                            <h3>Sales</h3>
                        </div>
                        <div className="col-xs-12 col-sm-6 text-align" style={{marginBottom: 15}}>
                            <ReactToExcel
                                className="btn btn-primary table-button" 
                                table="sales-summary-to-xls"
                                filename="sales-summary"
                                sheet="sheet 1"
                                buttonText="Export"
                            />
                        </div>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6" style={{marginBottom: 5, marginTop: 5}}>
                                {/* <ModalDatePicker />                     */}
                            </div>
                        </div>
                    </form>
                    <hr/>
                    {/* Table Item */}
                    <div className="row">          
                        <div className="col-xs-12 col-sm-5 col-md-5 col-lg-3 text-center nav flex-column nav-pills" aria-orientation="vertical" style={{marginBottom: 20}}>
                            <div className="container sales-nav">                               
                                <Link className="nav-link active" to="/reports/sales/sales_summary" data-toggle="pill">
                                     Summary
                                </Link>
                                <Link className="nav-link" to="/reports/sales/item_sales">
                                    Item 
                                </Link>
                                <Link className="nav-link" to="/reports/sales/category_sales">
                                    Category 
                                </Link>
                            </div>            
                        </div>

                        <br></br>
                        <div className="col-xs-12 col-sm-7 col-md-7 col-lg-9">
                            <div className="table-responsive">
                                <table className="table" id="sales-summary-to-xls">
                                    <tbody>
                                        <tr>
                                            <th>Total Sales</th>
                                                <td> {this.convertToRupiah ( this.state.ListSummarySales.totalSales)}</td>
                                        </tr>
                                        <tr>
                                            <th>Sales</th>
                                                <td> {this.state.ListSummarySales.sales}</td>      
                                        </tr>
                                        <tr>
                                            <th>Average Sales</th>
                                                <td> {this.convertToRupiah( this.state.ListSummarySales.averageSales)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
// export default SalesSummary;
export default connect("toggle, from, to, is_login, token", actions)(withRouter(SalesSummary))