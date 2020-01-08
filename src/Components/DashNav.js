import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import '../Pages/style.css'
import logo from '../Assets/logo_transparent.png'

import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";



class DashNav extends Component {

    render() {
        return <nav id="sidebar" className={this.props.toggle ? 'active': ''}>
        <div className="sidebar-header">
            <Link to='/dashboard'>
                <div className="row nav-row" style={{padding: 0}}>
                    <div className="col-5 text-right" style={{padding: 0}}>
                        <img src={logo} className="login-logo" alt="" style={{height: 50}}/>
                    </div>
                    <div className="col-7 text-left" style={{padding: 0}}>
                        <span className="dash-title">AppWare</span>
                    </div>
                </div>
            </Link>
        </div>
         
        <ul className="list-unstyled components">
            <li className="active">
                <a href="#Profile" id='id_dashboard' data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                    <span  className=''>DASHBOARD</span>
                </a>
                <ul className="collapse list-unstyled" id="Profile">
                    <li>
                        <Link to="/dashboard" id='id_home_dashboard'><span className='fa fa-columns' ></span><span>&nbsp; Home</span></Link>
                    </li>
                    <li>
                        <Link to="/profile" id='id_home_profile'><span className='fa fa-user-alt' ></span><span>&nbsp; My Profile</span></Link>
                    </li>
                    <li>
                        <Link to="/employees" id='home_id_employee'><span className='fa fa-people-carry' ></span><span>&nbsp; Employees</span></Link>
                    </li>
                    
                    <li>
                        <Link to="/" onClick={() => this.props.handleLogout()}><span  id='id_logout_home' className='fa fa-sign-out-alt'></span><span >&nbsp; Sign Out</span></Link>
                    </li>
                </ul>
            </li>
        </ul>

        <ul className="list-unstyled components" id='ul_menu_sidebar'>
            <li className="active" id='li_pencet_report'>
                <a href="#REPORT" data-toggle="collapse" id='id_report-sidebar' aria-expanded="false" className="dropdown-toggle">
                    <span  className=''> REPORT</span>
                 </a>
                <ul className="collapse list-unstyled" id="REPORT">
                    <li>
                        <Link to="/reports/sales/sales_summary" id='sales_summary'><span className='fa fa-file-invoice-dollar'></span><span>&nbsp; Sales</span></Link>
                    </li>
                    <li>
                        <Link to="/reports/transactions" id='sales_transactions'><span className='fab fa-paypal'></span><span>&nbsp; Transactions</span></Link>
                    </li>
                    
                </ul>
            </li>
            <li className="active" id='li_pencet_library'>
                <a href="#LIBRARY" id='report_library' data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                    <span  className=''> LIBRARY</span>
                 </a>
                <ul className="collapse list-unstyled" id="LIBRARY">
                    <li>
                        <Link to='/category' id='category_klik'><span className='fa fa-tags'></span><span>&nbsp; Categories</span></Link>
                    </li>
                    <li>
                        <Link to='/item' id='item_klik'><span className='fa fa-book'></span><span>&nbsp; Item </span></Link>
                    </li>
                    <li>
                        <Link to='/packages' id='packages_klik'><span className='fa fa-box'></span><span>&nbsp; Packages</span></Link>
                    </li>
                    <li>
                        <Link to='/qrcode' id='qrcode_klik'><span className='fa fa-qrcode'></span><span>&nbsp; QR Code</span></Link>
                    </li>
                </ul>
            </li>
            <li className="active" id='li_pencet_inventory'>
                <a href="#INVENTORY" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                    <span  className=''> INVENTORY</span>
                 </a>
                <ul className="collapse list-unstyled" id="INVENTORY">
                    <li>
                        <Link to='/inventory/summary' id='summary-inventory'><span className='fa fa-align-justify'></span><span>&nbsp; Summary</span></Link>
                    </li>
                    <li>
                        <Link to='/inventory/suppliers' id='inventory_suppliers'><span className='fa fa-truck'></span><span>&nbsp; Suppliers</span></Link>
                    </li>
                    <li>
                        <Link to='/inventory/purchase_orders' id='inventory_purchases'><span className='fa fa-credit-card'></span><span>&nbsp; Purchase Orders</span></Link>
                    </li>
                    <li>
                        <Link to='/library/sales' id='sales_inventory'><span className='fa fa-file-invoice-dollar'></span><span>&nbsp; Sales</span></Link>
                    </li>
                    <li>
                        <Link to='/inventory/adjustment' id='adjustment_inventory'><span className='fa fa-adjust'></span><span>&nbsp; Adjustments</span></Link>
                    </li>
                </ul>
            </li>
            <li className="active">
                <a href="#Track" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                    <span  className=''> TRACK</span>
                 </a>
                <ul className="collapse list-unstyled" id="Track">
                    <li>
                        <Link to='/Track'><span className='fa fa-search'></span><span>&nbsp; Track Stock</span></Link>
                    </li>
                </ul>
            </li>
            <li className="active">
                <a href="#CUSTOMERS" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                    <span  className=''> CUSTOMERS</span>
                 </a>
                <ul className="collapse list-unstyled" id="CUSTOMERS">
                    <li>
                        <Link to='/customers/list'><span className='fa fa-users'></span><span>&nbsp; Customer List</span></Link>
                    </li>
                </ul>
            </li>
        </ul>

        <div className="" style={{marginBottom: 5}}> 
          <a target="_blank" href="https://web.whatsapp.com/send?phone=6281938486386&amp;text=Halo, saya mau tanya tentang AppWare" className="img-icon-a nofocus" style={{color: "#5890C0"}}>
            <span>&nbsp;&nbsp;&nbsp;</span> <i className="fas fa-question-circle"></i> &nbsp;Help
          </a>
        </div>
        <div>
          <a href="tel:081938486386" className="img-icon-a nofocus" style={{color: "#5890C0"}}>
            <span>&nbsp;&nbsp;&nbsp;</span> <i className="fas fa-phone"></i> &nbsp;1500 300
          </a>
        </div>
    </nav>  
    }
}

// export default DashNav;
export default connect("toggle, ListSupplier, token, is_login", actions)(withRouter(DashNav))