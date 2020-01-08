import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store"
import ModalDeleteItem from "../Pages/ModalDeleteItem"

// component for Item
class ItemlibComp extends Component {
  // converter
  convertToRupiah(num) {
    if (num === undefined) {
        return "Rp xxx"
    }
    var rupiah = '';
    var angkarev = num.toString().split('').reverse().join('');
    for (var i = 0; i< angkarev.length; i++){
      if ( i%3 === 0) {
        rupiah += angkarev.substr(i,3)+'.'
      }
    }
    return 'Rp '+rupiah.split('',rupiah.length-1).reverse().join('');
  }

  render() {   
    const route = '/edititem/' + this.props.id
    const route1 = '/item/detail/' + this.props.id
   return (
      <> 
            <tr>
              <td> <Link to={route1}>{this.props.item} </Link></td>
              <td>{this.props.category}</td>
              <td>{this.props.size}</td>
              <td>{this.props.unit}</td>
              <td>{this.convertToRupiah(this.props.sku) }</td>
              <td className=" ">
                <Link className='fa fa-edit text-warning' to={route}></Link>
                &nbsp;&nbsp;
                <ModalDeleteItem name={this.props.id}/>        
              </td>
            </tr>
       
      </>
    );
  }
}
export default connect("is_login,token,ListItem",actions)(withRouter(ItemlibComp));

