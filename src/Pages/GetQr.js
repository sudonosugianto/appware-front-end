import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import DashNav from "../Components/DashNav";
import QrComp from "../Components/QrComp";

import ReactToExcel from "react-html-table-to-excel"
import '../App.css'

import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";

class GetQr extends Component {
    componentDidMount = () => {
        const token = this.props.token;
        this.props.getAllQrCode(token)
    };
    render() {
       
        const  ListQrCode  = this.props.ListQrCode;
        return <div className="wrapper">
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
                        <h3>QR Code</h3>
                    </div>
                    <div className="col-xs-12 col-sm-6 text-align" style={{marginBottom: 15}}>
                        <ReactToExcel
                            className="btn btn-primary table-button" 
                            table="item-library-to-xls"
                            filename="item_library"
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
                <hr />
                {/* Table Item */}
                <div className="table-responsive">
                    <table className="table" id="item-library-to-xls">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Nama Item</th>
                                <th scope="col">Suppliers</th>
                                <th scope="col">QR Code</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {ListQrCode.map((item, key) => {
                                // console.log("hasil ", key);
                                return (
                                    <QrComp
                                        id = {item.id}
                                        code = {item.code}
                                        packageitemID = {item['packages.Items.id']}
                                        nama_item = {item['packages.Items.item']}
                                        packageID = {item['packages.id']}
                                        packages = {item['packages.package_name']}
                                        poID = {item['po.id']}
                                        poQuantity = {item['po.quantity']}
                                        poSuppliers = {item['po.suppliers.name']}
                                        
                                    />
                                );
                            })}
                             
                        </tbody>
                    </table>
                </div>
                {/* end of table item */}
            </div>
        </div>;
    }
}
export default connect("toggle, ListQrCode, from, to, is_login, token", actions)(withRouter(GetQr))