import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import CategorySalesComp from "../Components/CategorySalesComp";
import ReactToExcel from "react-html-table-to-excel"
import '../App.css'
import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";

// local
const getallCtegorySales = "http://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com:5000/api/user/categorysummary";
class CategorySales extends Component {
    state = {
        ListCategorySummary: [],
    };
    componentDidMount = () => {
        const token = this.props.token;
        const self = this;
        axios
            .get(getallCtegorySales, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(function (response) {
                // handle success
                self.setState({ ListCategorySummary: response.data });
                console.log("ambil result item", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    render() {
        const { ListCategorySummary } = this.state;
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
                                table="category-sales-to-xls"
                                filename="category-sales"
                                sheet="sheet 1"
                                buttonText="Export"
                            />
                        </div>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6" style={{marginBottom: 5, marginTop: 5}}>
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
                                <Link className="nav-link" to="/reports/sales/item_sales">
                                    Item 
                                </Link>
                                <Link className="nav-link active" to="/reports/sales/category_sales">
                                    Category 
                                </Link>
                            </div>            
                        </div>
                        <div className="col-xs-12 col-sm-7 col-md-7 col-lg-9">
                            <div className="table-responsive">
                                <table className="table" id="category-sales-to-xls">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Category</th>
                                            <th scope="col">Items Stock</th>
                                            <th scope="col">Gross Sold</th>
                                            <th scope="col">Assets</th>
                                            <th scope="col">*GSPC</th>
                                            <th scope="col">Modal per Category</th>
                                            <th scope="col">Margin</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {ListCategorySummary.map((item, key) => {
                                    return (
                                            <CategorySalesComp
                                            category={item.category}
                                            itemsStock={item.itemsStock}
                                            itemsSold={item.itemsSold}
                                            Assets={item.Assets}
                                            modalPerCategory={item.modalPerCategory}
                                            margin={item.margin}
                                            GSPC={item.GSPC}
                                            MPP={item.MPP}
                                            profitAssets={item.profitAssets}
                                                                                  
                                            />
                                        );
                                     })}
                                       
                                    </tbody>
                                </table>
                                <br/>
                                <p className="text-right">
                                    <i>*gross sales per category</i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
// export default CategorySales;
export default connect("toggle, from, to, is_login, token", actions)(withRouter(CategorySales))