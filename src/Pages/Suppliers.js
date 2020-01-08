import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import SuppliersComp from "../Components/SuppliersComp"
import ReactToExcel from "react-html-table-to-excel"
import '../App.css'

import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";


class Suppliers extends Component {
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
            this.props.handleSearchSuppliers(value, token)
        }
    };

    componentDidMount = () => {
		const token = this.props.token
		this.props.getSuppliers(token)
	};  render() {
    const ListSupplier = this.props.ListSupplier;
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
                            <h3>Suppliers</h3>
                        </div>
                        <div className="col-xs-12 col-sm-6 text-align" style={{marginBottom: 15}}>
                            <ReactToExcel
                                className="btn btn-primary table-button" 
                                table="supplier-to-xls"
                                filename="supplier"
                                sheet="sheet 1"
                                buttonText="Export"
                            />
                            <Link to="/inventory/suppliers/tambahsupplier">
                                <button className="btn btn-primary table-button" style={{marginLeft: 10}}>Add Supplier</button>
                            </Link>
                        </div>
                    </div>
                    <form>
                        <div className="row">
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
                        <table className="table" id="supplier-to-xls">
                            <thead className="thead-light">
                                <tr>
                                <th scope="col">Supplier</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Email</th>
                                <th scope="col">Address</th>
                                <th scope="col">City</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {ListSupplier.map((item, key) => {
                                console.log("hasil ", key);
                                return (
                                    <SuppliersComp
                                    id={item.id}
                                    userSuppliersID={item.userSuppliersID}  
                                    name={item.name}  
                                    phone_number={item.phone_number}  
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
// export default Suppliers;
export default connect("toggle, ListSupplier, token, is_login, from, to", actions)(withRouter(Suppliers))