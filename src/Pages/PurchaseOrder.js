import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import PurchaseOrderComp from "../Components/PurchaseOrderComp"
import ReactToExcel from "react-html-table-to-excel"
import '../App.css'
import ModalDatePicker from "../Pages/ModalDatePicker"
import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";
import moment from 'moment'



class PurchaseOrder extends Component {
    state = {
        ListPurchaseOrder: [],
        search : ''
    }
    handleInputChange = e => {
        let value = e.target.value;
        const token = this.props.token;
        this.setState({
            search: value
        })
        if(value.length > 2 || value.length == 0){
            this.props.handleSearchPurchaseOrder(value, token)
        }
    };
    
    componentWillReceiveProps(nextProps) {
        this.setState({ ListPurchaseOrder: nextProps.ListPurchaseOrder })
    }
    componentDidMount = () => {
        const token = this.props.token;
        const dateBefore = moment(this.props.from, 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss')
        const dateAfter = moment(this.props.to, 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss')
        this.props.getAllPurchaseOrder(token, dateBefore, dateAfter)
    };
    render() {
        const ListPurchaseOrder = this.state.ListPurchaseOrder;
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
                            <h3>Purchase Order</h3>
                        </div>
                        <div className="col-xs-12 col-sm-6 text-align" style={{marginBottom: 15}}>
                            <ReactToExcel
                                className="btn btn-primary table-button" 
                                table="po-to-xls"
                                filename="po"
                                sheet="sheet 1"
                                buttonText="Export"
                            />
                            <Link to="/inventory/purchase_orders/tambah_po">
                                <button className="btn btn-primary table-button" style={{marginLeft: 10}}>Create PO</button>
                            </Link>
                        </div>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6" style={{marginBottom: 5, marginTop: 5}}>
                                <ModalDatePicker />                    
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3" style={{marginBottom: 5, marginTop: 5}}>
                                <div className="row" style={{marginBottom: 5, marginTop: 5}}>
                                    <div className="col">
                                        <input type="text" name="search" placeholder="Search" 
                                         value={this.state.search}
                                         onChange={this.handleInputChange}
                                        className="form-control appware-form"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <hr/>
                    {/* Table Item */}
                    <div className="table-responsive">
                        <table className="table" id="po-to-xls">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Supplier</th>
                                    <th scope="col">Item Name</th>
                                    <th scope="col">Qty</th>
                                    <th scope="col">Package Price</th>
                                    <th scope="col">Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                            {ListPurchaseOrder.map((item, key) => {
                                // console.log("hasil ", key);
                                return (
                                    <PurchaseOrderComp
                                        id={item.id}
                                        supplierID={item.supplierID}
                                        suppliername={item['suppliers.name']}
                                        packagePOID={item.packagePOID}
                                        quantity={item.quantity}
                                        buyingPricePerPackage={item.buyingPricePerPackage}
                                        totalPrice={item.totalPrice}
                                        packname={item['packages.Items.item']}
                                        packat={item['packages.package_name']}
                                        
                                                                     
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
// export default PurchaseOrder;
export default connect("toggle, from, to, is_login, token,ListPurchaseOrder", actions)(withRouter(PurchaseOrder))