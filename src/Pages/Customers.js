import React, { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import CustomersComp from "../Components/CustomersComp"
import ReactToExcel from "react-html-table-to-excel"
import '../App.css'
import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";


class Customers extends Component {
    state = {
        search: "",
    }    
    // search
    handleInputChange = e => {
        let value = e.target.value;
        const token = this.props.token;
        this.setState({
            search: value
        })
        if(value.length > 2 || value.length == 0){
            this.props.handleSearchCustomers(value, token)
        }
    };
    componentDidMount = () => {
		const token = this.props.token;
		this.props.getCustomers(token)
	};

    render() {
        const ListCustomers  = this.props.ListCustomers;
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
                            <h3>Customers</h3>
                        </div>
                        <div className="col-xs-12 col-sm-6 text-align" style={{marginBottom: 15}}>
                            <ReactToExcel
                                className="btn btn-primary table-button" 
                                table="customer-to-xls"
                                filename="customer"
                                sheet="sheet 1"
                                buttonText="Export"
                            />
                            <Link to="/customers/tambah_customer">
                                <button className="btn btn-primary table-button" style={{marginLeft: 10}}>Add Customer</button>
                            </Link>
                        </div>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3" style={{marginBottom: 5, marginTop: 5}}>
                                <input type="text" name="search" placeholder="Search"
                                value={this.state.search}
                                onChange={this.handleInputChange}
                                className="form-control appware-form"/>
                            </div>
                        </div>
                    </form>
                    <hr/>
                    {/* Table Item */}
                    <div className="table-responsive">
                        <table className="table" id="customer-to-xls">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">City</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ListCustomers.map((item, key) => {
                                    return (
                                        <CustomersComp
                                            id={item.id}
                                            userCustomerID={item.userCustomerID}
                                            fullname={item.fullname}
                                            phoneNumber={item.phoneNumber}
                                            email={item.email}
                                            address={item.address}
                                            state={item.state}
                                            zipcode={item.zipcode}
                                            city={item.city}
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
export default connect("toggle,ListCustomers,token", actions)(withRouter(Customers))