import React, { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import PackagesComp from "../Components/PackagesComp";
import ReactToExcel from "react-html-table-to-excel"
import '../App.css'
import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";



class Packages extends Component {

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
            this.props.handleSearchPackages(value, token)
        }
    };
    componentDidMount = () => {
		const token = this.props.token;
        this.props.getAllPackages(token)
        this.props.getAllCategory(token)
	};
    render() {
        const  ListPackages  = this.props.ListPackages;
        const  ListCategory  = this.props.ListCategory;
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
                        <h3>Packages</h3>
                    </div>
                    <div className="col-xs-12 col-sm-6 text-align" style={{marginBottom: 15}}>
                        <ReactToExcel
                            className="btn btn-primary table-button" 
                            table="packages-to-xls"
                            filename="packages"
                            sheet="sheet 1"
                            buttonText="Export"
                        />
                        <Link to="/tambahpackages">
                            <button className="btn btn-primary table-button" style={{marginLeft: 10}}>Add Package</button>
                        </Link>
                    </div>
                </div>
                <form>
                    <div className="row">
                        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3" style={{marginBottom: 5, marginTop: 5}}>
                            <select className="form-control appware-form"
                            value={this.state.search}
                            onChange={this.handleInputChange}>
                               <option selected>All Categories</option>
                                {
                                    ListCategory.map((item, key) => {
                                    return  <option value={item.category} name={item.categoryd} >{item.category} </option>    
                                    })
                                 }
                            </select>
                        </div>
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
                    <table className="table" id="packages-to-xls">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Category</th>
                                <th scope="col">Packages</th>
                                <th scope="col">Qty per Package</th>
                                <th scope="col ">Action</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {ListPackages.map((item, key) => {
                                return (
                                    <PackagesComp
                                        id={item.id}
                                        itemID={item.itemID}
                                        category={item['Category.category']}
                                        item={item['Items.item']}
                                        qty={item.items_quantity}
                                        packages_name={item.package_name}
                                        created_at={item.created_at}
                                        updated_at={item.updated_at}
                                        nama_item = {item['Items.item']}
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

export default connect("toggle, ListPackages, ListCategory,token, from, to", actions)(withRouter(Packages))