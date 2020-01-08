import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store";
import ModalEmployee from "../Pages/ModalEmployee"
import ModalDeleteEmployee from "../Pages/ModalDeleteEmployee"

// component for Employee
class EmployeesComp extends Component {
  handleDelete = event => {
    event.preventDefault();
    let token = localStorage.getItem("token");
    const url = "http://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com:5000/api/users/subusers/";
    const headers = {
      Authorization: "Bearer " + token
    };
      this.props.DeleteEmployee(url,this.props.id,headers).then( ()=> {
      this.props.getEmployees(token)
      this.props.history.replace("/employees")
      })
  };
  render() {
    const route = '/employees/edit/' + this.props.id
   return (
      <>
        <tr>
          <td>{this.props.fullname}</td>
          <td>{this.props.username}</td>
          <td>{this.props.email}</td>
          <td>{this.props.phone_number}</td>
          <td><span className="badge badge-success">{this.props.subuser_type.toUpperCase()}</span></td>
          <td>
            <ModalEmployee ApiKey={this.props.apiKey}/>
          </td>
          <td>
            <Link className='fa fa-edit text-warning' to={route}></Link>
             &nbsp;&nbsp;
             <ModalDeleteEmployee name={this.props.id}/>
          </td>
        </tr>
      </>
    );
  }
}

export default connect("toggle,ListCustomers,token", actions)(withRouter(EmployeesComp))