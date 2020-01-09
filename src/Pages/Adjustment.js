import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import AdjustmentComp from "../Components/AdjustmentComp"
import ReactToExcel from "react-html-table-to-excel"
import '../App.css'
import ModalDatePicker from "../Pages/ModalDatePicker"

import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";


// local
const getAllActualStocks = "https://appware.halte.id/api/users/actualstock";
class Adjustment extends Component {
    state = {
        ListAdjustment: [],
    };
    componentDidMount = () => {
        const token = this.props.token;
        const self = this;
        axios
            .get(getAllActualStocks, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(function (response) {
                // handle success
                self.setState({ ListAdjustment: response.data.packages });
                console.log("ambil result item", response.data.packages);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
  render() {
    const { ListAdjustment } = this.state;
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
                    <div className="col-xs-12 col-sm-5 title-align" style={{marginBottom: 10}}>
                        <h3>Adjustment</h3>
                    </div>
                    <div className="col-xs-12 col-sm-7 text-align" style={{marginBottom: 15}}>
                        <ReactToExcel
                            className="btn btn-primary table-button" 
                            table="adjustment-to-xls"
                            filename="adjustment"
                            sheet="sheet 1"
                            buttonText="Export"
                        />
                        <Link to="/inventory/adjustment/tambah_adjustment">
                            <button className="btn btn-primary table-button" style={{marginLeft: 10}}>Create Adjustment</button>
                        </Link>
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
                <div className="table-responsive">
                <table className="table" id="adjustment-to-xls">
                    <thead className="thead-light">
                        <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Package</th>
                        <th scope="col">Actual Stock</th>
                        <th scope="col">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                    {ListAdjustment.map((item, key) => {
                                return (
                                    <AdjustmentComp
                                        id={item.id}
                                        userActualStocksID={item.userActualStocksID}
                                        packageActualStocksID={item.packageActualStocksID}
                                        item_name={item['packages.Items.item']}
                                        package_name={item['packages.package_name']}
                                        actual_stock={item.actual_stock}
                                        notes={item.notes}
                                        created_at={item.created_at}
                                        updated_at={item.updated_at}
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
export default connect("toggle, from, to, is_login, token", actions)(withRouter(Adjustment))