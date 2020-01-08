import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import ItemSalesComp from "../Components/ItemSalesComp";
import ReactToExcel from "react-html-table-to-excel"
import '../App.css'
import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";

const getAllitemSales = "http://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/packagessummary";
class ItemSales extends Component {
    state = {
        ListItemSales: [],
    };
    componentDidMount = () => {
        const token = this.props.token;
        const self = this;
        axios
            .get(getAllitemSales, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(function (response) {
                // handle success
                self.setState({ ListItemSales: response.data });
                console.log("ambil result item", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    render() {
        const { ListItemSales } = this.state;
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
                            <h3> Sales</h3>
                        </div>
                        <div className="col-xs-12 col-sm-6 text-align" style={{marginBottom: 15}}>
                            <ReactToExcel
                                className="btn btn-primary table-button" 
                                table="item-sales-to-xls"
                                filename="item-sales"
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
                                <Link className="nav-link" to="/reports/sales/sales_summary">
                                     Summary
                                </Link>
                                <Link className="nav-link active" to="/reports/sales/item_sales">
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
                                <table className="table" id="item-sales-to-xls">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Items Sold</th>
                                            <th scope="col">Net Sales</th>
                                            <th scope="col">Gross Profit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {ListItemSales.map((item, key) => {
                                        // console.log("hasil ", key);
                                    return (
                                            <ItemSalesComp
                                           
                                            packagename={item.packageName} 
                                            itemName={item.itemName}
                                            categoryName = {item.categoryName}
                                            packageSold={item.packageSold}
                                            netSales={item.netSales}
                                            profit={item.profit}                  
                                            />
                                        );
                                     })}
                                        
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

export default connect("toggle, from, to, token, is_login", actions)(withRouter(ItemSales))