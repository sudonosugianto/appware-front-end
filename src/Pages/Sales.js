import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import SalesComp from "../Components/SalesComp"
import ReactToExcel from "react-html-table-to-excel"
import '../App.css'
import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";
import moment from 'moment'
import ModalDatePicker from "../Pages/ModalDatePicker"

const getAllSales = "https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/sales";
const searchKeyword = "https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/sales?search=";


class Sales extends Component {
    state = {
        ListSales: [],
        search : ''
    }
    handleInputChange = e => {
        let value = e.target.value;
        const token = this.props.token;
        this.setState({
            search: value
        })
        if(value.length > 2 || value.length == 0){
            this.props.handleSearchSales(value, token)
        }
    };
    
    componentWillReceiveProps(nextProps) {
        this.setState({ ListSales: nextProps.ListSales })
    }
    componentDidMount = () => {
        const token = this.props.token;
        const dateBefore = moment(this.props.from, 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss')
        const dateAfter = moment(this.props.to, 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss')
        this.props.getAllTransactions(token, dateBefore, dateAfter)
    };
    render() {
        const  ListSales  = this.state.ListSales;
        return (
            <div className="wrapper">
                <DashNav toggle={this.props.toggle}/>
                <div id="content">
                    <div className="container" style={{margin: 0}}>
                        <button type="button" id="sidebarCollapse" className="btn table-button" onClick={() => this.props.switchToggle() }>
                            <i className="fa fa-chevron-left strong" 
                                className={this.props.toggle ? ' fa fa-chevron-left strong rotate down': 'fa fa-chevron-right strong rotate up'}
                            />
                        </button>
                    </div>
                    <br></br>
                    <br></br>
                    {/* Main Content */}
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 title-align" style={{marginBottom: 10}}>
                            <h3>Sales</h3>
                        </div>
                        <div className="col-xs-12 col-sm-6 text-align" style={{marginBottom: 15}}>
                            <ReactToExcel
                                className="btn btn-primary table-button" 
                                table="po-to-xls"
                                filename="po"
                                sheet="sheet 1"
                                buttonText="Export"
                            />
                            <Link to="/library/tambahsales">
                                <button className="btn btn-primary table-button" style={{marginLeft: 10}}>Create Sale</button>
                            </Link>
                        </div>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6" style={{marginBottom: 5, marginTop: 5}}>
                                <ModalDatePicker />                    
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3" style={{marginBottom: 5, marginTop: 5}}>
                                <input type="text" name="search" 
                                value={this.state.search}
                                onChange={this.handleInputChange}
                                placeholder="Search" className="form-control appware-form"/>
                            </div>
                        </div>
                    </form>
                    <hr/>
                    {/* Table Item */}
                    <div className="table-responsive">
                        <table className="table" id="po-to-xls">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Customer</th>
                                    <th scope="col">Item</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Qty</th>
                                    <th scope="col">Price per Package</th>
                                    <th scope="col">Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                            {ListSales.map((item, key) => {
                                // console.log("hasil ", key);
                                return (
                                    <SalesComp
                                        id={item.id}
                                        packageSalesID={item.packageSalesID}
                                        itemname={item['packages.Items.item']}
                                        customerSalesID={item['customers.fullname']}
                                        packagesname={item['packages.package_name']}
                                        
                                        category={item['packages.Category.category']}
                                        quantity={item.quantity}
                                        sellingPricePerPackage={item.sellingPricePerPackage}
                                        totalPrice={item.totalPrice}       
                                    />
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                    {/* end of table item */}
                </div>
            </div>
        )
    }
}
// export default Sales;
export default connect("toggle, from, to, is_login, token,ListSales", actions)(withRouter(Sales))