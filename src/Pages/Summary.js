import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import SummaryComp from "../Components/SummaryComp"
import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";
import ReactToExcel from "react-html-table-to-excel"
import '../App.css'
import moment from 'moment'
import ModalDatePicker from "../Pages/ModalDatePicker"


class Summary extends Component {
    state = {
        Listsummary: [],
        search: "",
        data : []
    };
    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.Listsummary })
    }
    handleInputChange = e => {
        let value = e.target.value;
        const token = this.props.token;
        this.setState({
            search: value
        })
        if(value.length > 2 || value.length == 0){
            this.props.handleSearchSummary(value, token)
        }
    };
    componentDidMount = () => {
        const self = this;
        const dateBefore = moment(this.props.from, 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss')
        const dateAfter = moment(this.props.to, 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss')
        const token = this.props.token;
        this.props.getAllSummary(token,dateAfter,dateBefore)
        
        // console.log(dateBefore, dateAfter)
      };


    render() {
        const  Listsummary  = this.props.Listsummary;
        // console.log('a', Listsummary)
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
                            <h3>Summary</h3>
                        </div>
                        <div className="col-xs-12 col-sm-6 text-align" style={{marginBottom: 15}}>
                            <ReactToExcel
                                className="btn btn-primary table-button" 
                                table="inventory-summary-to-xls"
                                filename="inventory-summary"
                                sheet="sheet 1"
                                buttonText="Export"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6" style={{marginBottom: 5, marginTop: 5}}>
                                <ModalDatePicker />                    
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3" style={{marginBottom: 5, marginTop: 5}}>
                                <div className="row" style={{marginBottom: 5, marginTop: 5}}>
                                    <div className="col">
                                        <input type="text" name="search" 
                                            value={this.state.search}
                                            onChange={this.handleInputChange}
                                            placeholder="Search" className="form-control appware-form"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    {/* Table Item */}
                    <div className="table-responsive">
                        <table className="table" id="inventory-summary-to-xls">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Item</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">PO</th>
                                    <th scope="col">Sales</th>
                                    <th scope="col">Adjustment</th>
                                    <th scope="col">Ending</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                            {Listsummary.map((item, key) => {
                                return (
                                    <SummaryComp
                                    id = {item.id}
                                    date = {item.date}  
                                    packageName = {item.Package}  
                                    PO = {item.POQuantity}  
                                    sales = {item.salesQuantity}  
                                    category = {item.Category}
                                    adjustment = {item.adjusment}  
                                    Ending = {item.actualStock}      
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
// export default Summary;
export default connect("toggle, from, token, to, is_login,Listsummary,", actions)(withRouter(Summary))