import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";

import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";

const tambahAdmin = "http://52.77.222.248:8000/user/item";
class ItemDetail extends Component {
    state = {
        ListAdmin: [],
    // catID: "",
    item: "",
    picture: "",
    size: "",
    unit: "",
    SKU: ""
      };
    
    componentDidMount = () => {
    const self = this;
    const id = this.props.match.params.id;
    const token = this.props.token;
    const headers = {
        Authorization: "Bearer " + token
    };
    axios
        .get("http://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/item/" + this.props.match.params.id,{headers})
        .then(response => {
        const data = response.data.item[0]
        self.setState({ 
            // nama: data.nama,
            item: data.item,
            picture: data.picture,
            unit: data.unit,
            size: data.size,
            SKU: data.SKU,
            picture: data.picture,
            category: data['Category.category'],
            created_at : data.created_at,
            updated_at : data.updated_at
        })      
        console.log('ayam',response.data.item)
        })
        .catch(function(error) {
        console.log(error);
        });
    };   
    
  render() {
    
    return (
        <div className='wrapper'>
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
                <h4 className="text-center">Item Detail</h4>
                <br />
                <div className='container'>
                    <div className='row row-center'>
                        <div className='col-md-1 col-lg-3'></div>
                        <div className= "col-md-10 col-lg-6 table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>Nama Item</th>
                                            <td>{this.state.item}</td>
                                    </tr>
                                    <tr>
                                        <th>Category</th>
                                            <td>{this.state.category}</td>      
                                    </tr>
                                    <tr>
                                        <th>Size</th>
                                            <td>{this.state.size}</td>
                                    </tr>
                                    <tr>
                                        <th>Unit</th>
                                            <td>{this.state.unit}</td>
                                    </tr>
                                    <tr>
                                        <th>SKU</th>
                                            <td>{this.state.SKU}</td>
                                    </tr>
                                    <tr>
                                        <th>Created At</th>
                                            <td>{this.state.created_at}</td>
                                    </tr>
                                    <tr>
                                        <th>Updated At</th>
                                            <td>{this.state.updated_at}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center">
                                <button type="submit" className="btn" style={{marginRight: 10}}><Link  to='/item'>Back</Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
export default connect("toggle, from, to, is_login, token", actions)(withRouter(ItemDetail))