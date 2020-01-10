import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link, Redirect } from "react-router-dom";
import { Pie, Bar } from '../../node_modules/react-chartjs-2';
import '../App.css'
import DashNav from "../Components/DashNav";
import { withRouter } from 'react-router-dom'
import { connect } from "unistore/react";
import { actions } from "../store";

const getBarchart = "https://appware-api.halte.id/api/user/topitemcat";
const getsummarytransaction = "https://appware-api.halte.id/api/users/transactionssummary";
const getCatVol = "https://appware-api.halte.id/api/user/catbyvol";
class Dashboard extends Component {
    // convert
    convertToRupiah(num) {
        if (num === undefined) {
            return ""
        }
        var rupiah = '';
        var angkarev = num.toString().split('').reverse().join('');
        for (var i = 0; i < angkarev.length; i++) {
            if (i % 3 === 0) {
                rupiah += angkarev.substr(i, 3) + '.'
            }
        }
        return 'Rp ' + rupiah.split('', rupiah.length - 1).reverse().join('');
    }
    state = {
        ListItem: [],
        Listcat: [],
        ListBar: [],

    };
    componentDidMount = () => {
        const self = this;
        axios
            .get(getCatVol, {
                headers: {
                    Authorization: "Bearer " + this.props.token
                }
            })
            .then(function (response) {
                // handle success
                self.setState({ Listcat: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });

        axios
            .get(getsummarytransaction, {
                headers: {
                    Authorization: "Bearer " + this.props.token
                }
            })
            .then(function (response) {
                // handle success
                self.setState({ ListItem: response.data });
                // console.log("ambil result cat", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        axios
            .get(getBarchart, {
                headers: {
                    Authorization: "Bearer " + this.props.token
                }
            })
            .then(function (response) {
                // handle success
                self.setState({ ListBar: response.data });
                // console.log("ambil result cat", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    render() {
        const Listcat = this.state.Listcat
        const ListItem = this.state.ListItem
        const ListBar = this.state.ListBar
        let nama = []
        let volume = []
        let sales = []
        let bar = []
        let nam_bar = []

        Listcat.map((item, key) => {
            let k = Object.keys(item)
            nama.push(k[0])
            volume.push(item[k[0]].volume)
            sales.push(item[k[0]].Sales)
        })
        const data = {
            labels: nama,
            datasets: [{
                data: volume,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    'blue',
                    'green'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    'blue',
                    'green'
                ]
            }]
        };
        const datas = {
            labels: nama,
            datasets: [{
                data: sales,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    'blue',
                    'green'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    'blue',
                    'green'
                ]
            }]
        };
        const dataBar = {
            labels: nama,
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 3,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: sales
                }
            ]
        };

        if (this.props.is_login != "" || this.props.is_login == false) {
            if (this.props.is_login == false) {
                    return <Redirect to={{ pathname: "/signin" }} />
            }
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
                        <h3>Dashboard</h3>
                    </div>
                </div>
                <form>
                    <div className="row">
                        <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6" style={{ marginBottom: 5, marginTop: 5 }}>
                            {/* <ModalDatePicker /> */}
                        </div>
                    </div>
                </form>
                <br />
                <br />
                <h6 className="text-muted title-align">SALES SUMMARY</h6>
                <hr />
                <div className="container" style={{ marginBottom: 20 }}>
                    <div className="row">
                        <div className="col-md-4 col-xs-12" style={{ marginBottom: 20 }}>
                            <div className="card" >
                                <div className="card-body">
                                    <h7 className="card-subtitle mb-2 text-muted">TOTAL SALES</h7>
                                    <br />
                                    <br />
                                    <h5 className="card-subtitle mb-2 bold text-muted">{this.convertToRupiah(ListItem['totalSales']) ? this.convertToRupiah(ListItem['totalSales']) : <h6> No record net sales </h6> }</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-xs-12" style={{ marginBottom: 20 }}>
                            <div className="card" >
                                <div className="card-body">
                                    <h7 className="card-subtitle mb-2 text-muted">SALES TRANSACTIONS</h7>
                                    <br />
                                    <br />
                                    <h5 className="card-subtitle mb-2 bold text-muted">{ListItem.sales ? ListItem.sales : <h6>No record sales transactions</h6> }</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-xs-12" style={{ marginBottom: 20 }}>
                            <div className="card" >
                                <div className="card-body">
                                    <h7 className="card-subtitle mb-2 text-muted">AVERAGE SALES</h7>
                                    <br />
                                    <br />
                                    <h5 className="card-subtitle mb-2 bold text-muted">{this.convertToRupiah(ListItem.averageSales) ? this.convertToRupiah(ListItem.averageSales) : <h6>No record average sales</h6> }</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h6 className="text-muted title-align">ITEM SUMMARY</h6>
                <hr />
                <div className='container'>
                    <div className='row'>
                        <div className="col-md-6 col-xs-12" style={{ marginBottom: 20 }}>
                            <div className="card" >
                                <div className="card-body">
                                    <h6 className='text-muted bold text-center'>STOCK BY CATEGORY</h6>
                                    <br />
                                    <Pie
                                        data={data}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xs-12" style={{ marginBottom: 20 }}>
                            <div className="card" >
                                <div className="card-body">
                                    <h6 className='text-muted bold text-center'>SALES BY CATEGORY</h6>
                                    <br />
                                    <Pie
                                        data={datas}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className='container'>
                    <h6 className="text-muted text-center">TOP ITEM SALES PER CATEGORY</h6>
                    <br />
                    <div className='row text-center'>
                        {ListBar.map((item, key) => {
                            return (
                                <div className='col-md-4 col-xs-12' style={{ marginBottom: 30 }}>
                                    <div className="card" key={key}>
                                        <Bar
                                            // key={key}
                                            data={{
                                                labels: item.labels,
                                                datasets: [
                                                    {
                                                        label: item.title,
                                                        backgroundColor: 'rgba(255,99,132,0.2)',
                                                        borderColor: 'rgba(255,99,132,1)',
                                                        borderWidth: 2,
                                                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                                        hoverBorderColor: 'rgba(255,99,132,1)',
                                                        data: item.data

                                                    }
                                                ]
                                            }}
                                            width={50}
                                            height={250}
                                            options={{
                                                maintainAspectRatio: false
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>;
    }
}
// export default Dashboard;
export default connect("toggle, is_login, from, to, token", actions)(withRouter(Dashboard))