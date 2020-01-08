import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";
import ModalDeleteCategory from "../Pages/ModalDeleteCategory"

// component for category item
class CategoryComp extends Component {
  render() { 
   const route = '/editcategory/' + this.props.id
   return (
      <>
        <tr>
          <td>{this.props.category}</td>
          <td className=""> 
            <Link className='fa fa-edit text-warning' to={route}></Link>
             &nbsp;&nbsp; 
             <ModalDeleteCategory name={this.props.id}/>            
         </td>
        </tr>
      </>
    );
  }
}
export default connect("toggle,ListCategory,token", actions)(withRouter(CategoryComp))