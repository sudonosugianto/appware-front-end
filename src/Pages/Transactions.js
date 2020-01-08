import React, { Component } from "react";
import DashNav from "../Components/DashNav";
import TransactionsComp from "../Components/TransactionsComp"
import ReactToExcel from "react-html-table-to-excel"
import '../App.css'
import ModalDatePicker from "../Pages/ModalDatePicker"
import { withRouter } from 'react-router-dom'
import { connect } from "unistore/react";
import { actions } from "../store";
import moment from 'moment'


class Transactions extends Component {
    state = {
        ListTrasactions: [],
        search : ''
    }
    handleInputChange = e => {
        let value = e.target.value;
        const token = this.props.token;
        this.setState({
            search: value
        })
        if(value.length > 2 || value.length == 0){
            this.props.handleSearchTransactions(value, token)
        }
    };
    
    componentWillReceiveProps(nextProps) {
        this.setState({ ListTrasactions: nextProps.ListTrasactions })
    }
    componentDidMount = () => {
        const token = this.props.token;
        const dateBefore = moment(this.props.from, 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss')
        const dateAfter = moment(this.props.to, 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss')
        this.props.getAllTransactions(token, dateBefore, dateAfter)
    };
    render() { 
        const ListTrasactions = this.state.ListTrasactions;
        console.log(this.state.ListTrasactions)
        return (
            <div className="wrapper">
                <DashNav toggle={this.props.toggle} />
                <div id="content">
                    <div className="container" style={{ margin: 0 }}>
                        <button type="button" id="sidebarCollapse" className="btn table-button" onClick={() => this.props.switchToggle()}>
                            <i className="fa fa-chevron-left strong"
                                className={this.props.toggle ? ' fa fa-chevron-left strong rotate down' : 'fa fa-chevron-right strong rotate up'}
                            />
                        </button>
                    </div>
                    <br />
                    <br />
                    {/* Main Content */}
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 title-align" style={{ marginBottom: 10 }}>
                            <h3>Transactions</h3>
                            {/* Seconds: {this.state.seconds} */}
                        </div>
                        <div className="col-xs-12 col-sm-6 text-align" style={{ marginBottom: 15 }}>
                            <ReactToExcel
                                className="btn btn-primary table-button"
                                table="transactions-to-xls"
                                filename="transactions"
                                sheet="sheet 1"
                                buttonText="Export"
                            />
                        </div>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6" style={{ marginBottom: 5, marginTop: 5 }}>
                                <ModalDatePicker />
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3" style={{ marginBottom: 5, marginTop: 5 }}>
                                <div className="row" style={{ marginBottom: 5, marginTop: 5 }}>
                                    <div className="col">
                                        <input type="text" name="search" 
                                        value={this.state.search}
                                        onChange={this.handleInputChange}
                                        placeholder="Search" className="form-control appware-form" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <hr />
                    {/* Table Item */}
                    <div className="table-responsive">
                        <table className="table" id="transactions-to-xls">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col"> Status</th>
                                    <th scope="col">Supplier/Customers</th>
                                    <th scope="col">Item</th>
                                    <th scope="col"> Qty</th>
                                    <th scope="col"> Buying Price per Pack</th>
                                    <th scope="col"> Selling Price per Pack</th>
                                    <th scope="col"> Total</th>
                                   

                                </tr>
                            </thead>
                            <tbody>
                                {ListTrasactions.map((item, key) => {
                                    // console.log("hasil ", key);
                                    return (
                                        <TransactionsComp
                                            id={item.id}
                                            createdAt={item.created_at}
                                            suppliersname={item['suppliers.name']}
                                            package_name={item['packages.package_name']}
                                            name_item={item['packages.Items.item']}
                                            quantity={item.quantity}
                                            buyingPricePerPackage={item.buyingPricePerPackage}
                                            sellingPricePerPackage={item.sellingPricePerPackage}
                                            totalPrice={item.totalPrice}
                                            name = {item['customers.fullname']}
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
export default connect("toggle, from, to, is_login, token,ListTrasactions", actions)(withRouter(Transactions))