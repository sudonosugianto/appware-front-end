import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";// import './style.css'
import DashNav from "../Components/DashNav";
import '../App.css'
import { withRouter } from 'react-router-dom'
import { connect } from "unistore/react";
import { actions } from "../store";
import moment from 'moment'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import QrReader from 'react-qr-scanner'
import swal from 'sweetalert2';

var QRCode = require('qrcode.react');


class Track extends Component {
    constructor(props) {
        super(props)
        this.state = {
            delay: 500,
            result: 'No result',
            search: "",
            openqr: true,
        }
        this.handleScan = this.handleScan.bind(this)
    }
    handleScan(data) {
        this.setState({
            result: data,
        })
    }
    handleError(err) {
        console.error(err)
    }

    printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input, { width: 1100, height: 1600 })
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF("portrait", "mm", "a4");
                pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
                // pdf.output('dataurlnewwindow');
                pdf.save("track.pdf");
            })
            ;
    }
    // search
    handleInputChange = e => {
        let value = e.target.value;
        const token = this.props.token;
        this.setState({
            search: value
        })
        if (value.length > 2 || value.length == 0) {
            this.props.handleSearchQrCode(value, token)
        }
    };

    handleQROpen() {
        this.setState({
            openqr: !this.state.openqr
        })
    }

    render() {

        const ListQrSearch = this.props.ListQrSearch;
        // console.log(this.props.ListQrSearch)
        const previewStyle = {
            height: '100%',
            width: '100%'
        }
        let handleObject = this.state.result;
        // menemukan qrcode
        if (handleObject !== 'No result' && handleObject !== null && this.state.delay != false) {
            const hasil_object = JSON.parse(handleObject);
            this.setState({
                quantity: hasil_object.quantity,
                packageSalesID: hasil_object.packageSalesID,
                nama_item: hasil_object.nama_item,
                search: hasil_object.code,
                delay: false
            }
            )
            swal({
                title: 'Scan Success !',
                showConfirmButton: false,
                timer: 2000
              })
            this.props.handleSearchQrCode(hasil_object.code, this.props.token)

            //   console.log('hasillllllll',hasil_object.code)
        }
        return <div className="wrapper">
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
                        <h3>Tracking</h3>
                    </div>
                    <div className="col-xs-12 col-sm-6 text-align" style={{ marginBottom: 15 }}>
                        <button
                            onClick = {() => this.handleQROpen()} 
                            className="btn btn-primary table-button">
                            Scan QR
                        </button>
                        <button onClick={this.printDocument} className="btn btn-primary table-button" style={{ marginLeft: 10 }}>Print</button>

                    </div>
                </div>
                <form>
                    <div className="row">
                        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3" style={{ marginBottom: 5, marginTop: 5 }}>
                            <input type="text"
                                name="search"
                                value={this.state.search}
                                onChange={this.handleInputChange}
                                placeholder="Search" className="form-control appware-form" >
                            </input>
                        </div>
                    </div>
                </form>

                <div className='text-center'>
                    <div className="row text-center">
                        <div className="col-xs-12 col-sm-1 col-md-1 col-lg-3"></div>
                        <div className="col-xs-12 col-sm-10 col-md-10 col-lg-6">
                            <div className={this.state.openqr ? "qropen": ""}>
                                <br/>
                                <br/>
                                <QrReader
                                    delay={this.state.delay}
                                    style={previewStyle}
                                    onError={this.handleError}
                                    onScan={this.handleScan}
                                />
                                <br />
                                <p style={{ fontWeight: 700 }}>Scan Package QR Code</p>
                                <br />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-1 col-md-1 col-lg-3"></div>
                    </div>
                </div>

                {/* Table Item */}
                <div id="divToPrint">
                    <div className='container'>
                        <div className="row">
                            <div className="col">
                                <br />
                                <br />
                                <h6 className="text-muted text-center">RESULTS</h6>
                                <br />
                                <div className="table-responsive">
                                    <table className="table" id="sales-summary-to-xls">
                                        <tbody>
                                            <tr>
                                                <th>Code</th>
                                                <td>{ListQrSearch.code} </td>
                                            </tr>
                                            <tr>
                                                <th>Item</th>
                                                <td>{ListQrSearch['packages.Items.item']} </td>
                                            </tr>
                                            <tr>
                                                <th>Qty per Package</th>
                                                <td>{ListQrSearch['packages.package_name']}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6" style={{marginTop: 30}}>
                                <h6 className="text-muted text-center">STOCK IN</h6>
                                <br />
                                <div className="table-responsive">
                                    <table className="table" id="sales-summary-to-xls">
                                        <tbody>
                                            <tr>
                                                <th>Supplier</th>
                                                <td>{ListQrSearch['po.suppliers.name']} </td>
                                            </tr>
                                            <tr>
                                                <th>Address</th>
                                                <td>{ListQrSearch['po.suppliers.address']} </td>
                                            </tr>
                                            <tr>
                                                <th>Qty</th>
                                                <td>{ListQrSearch['po.quantity']} </td>
                                            </tr>
                                            <tr>
                                                <th>Date</th>
                                                <td>{moment(ListQrSearch.created_at).format("MMM Do")} </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <br />
                            <div className="col-xs-12 col-sm-6" style={{marginTop: 30}}>
                                <h6 className="text-muted text-center">STOCK OUT</h6>
                                <br />
                                <div className="table-responsive">
                                    <table className="table" id="sales-summary-to-xls">
                                        <tbody>
                                            <tr>
                                                <th>Customer</th>
                                                <td>{ListQrSearch['sales.customers.fullname']} </td>
                                            </tr>
                                            <tr>
                                                <th>Address</th>
                                                <td>{ListQrSearch['sales.customers.address']} </td>
                                            </tr>
                                            <tr>
                                                <th>Qty</th>
                                                <td>{ListQrSearch['sales.quantity']} </td>
                                            </tr>
                                            <tr>
                                                <th>Date</th>
                                                <td>{moment(ListQrSearch.updated_at).format("MMM Do")} </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end of table item */}
            </div>
        </div>;
    }
}

// export default Packages;
export default connect("toggle, ListQrSearch, token, from, to", actions)(withRouter(Track))