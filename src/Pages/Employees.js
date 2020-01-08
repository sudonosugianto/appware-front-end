import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import EmployeesComp from "../Components/EmployeesComp"
import ReactToExcel from "react-html-table-to-excel"
import '../App.css'
import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";



class Employees extends Component {
    componentDidMount = () => {
		const token = this.props.token;
		this.props.getEmployees(token);
	};
    render() {
        const ListEmployees  = this.props.ListEmployees;
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
                            <h3>Employees</h3>
                        </div>
                        <div className="col-xs-12 col-sm-6 text-align" style={{marginBottom: 15}}>
                            <ReactToExcel
                                className="btn btn-primary table-button" 
                                table="employee-to-xls"
                                filename="employee"
                                sheet="sheet 1"
                                buttonText="Export"
                            />
                            <Link to="/employees/tambah_employee">
                                <button className="btn btn-primary table-button" style={{marginLeft: 10}}>Add Employee</button>
                            </Link>
                        </div>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3" style={{marginBottom: 5, marginTop: 5}}>
                                <input type="text" name="search" placeholder="Search"
                                // value={this.state.search}
                                onChange={this.handleInputChange}
                                className="form-control appware-form"/>
                            </div>
                        </div>
                    </form>
                    <hr/>
                    {/* Table Item */}
                    <div className="table-responsive">
                        <table className="table" id="employee-to-xls">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">ApiKey</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ListEmployees.map((item, key) => {
                                    return (
                                        <EmployeesComp
                                            id={item.id}
                                            fullname={item.fullname}
                                            username={item.username}
                                            email={item.email}
                                            phone_number={item.phone_number}
                                            subuser_type={item.subuser_type}
                                            apiKey={item.apiKey}
                                            status={item.status}
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
export default connect("toggle,ListEmployees,token", actions)(withRouter(Employees))