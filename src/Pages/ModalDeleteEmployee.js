import React from 'react';
import Modal from 'react-responsive-modal';
import '../App.css'
import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";


class ModalDeleteEmployee extends React.Component {
  state = {
    open: false,
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  handleDelete = event => {
    event.preventDefault();    
    let token = this.props.token;
    const url = "https://appware-api.halte.id/api/users/subusers/";
    const headers = {
      Authorization: "Bearer " + token
    };

        this.props.DeleteEmployee(url,this.props.name, headers).then( ()=> {
        this.props.getEmployees(token)
        this.props.history.replace("/employees")
        this.onCloseModal()
      })
    
  };


  render() {
    const { open } = this.state;
    console.log (this.props)
    return (
        <span>        
            <a className='fa fa-trash text-danger' onClick={this.onOpenModal}></a>
            <Modal open={open} onClose={this.onCloseModal} showCloseIcon={false}>
                <h2 className="text-center">Are you sure ?</h2>
                <hr/>
                <p className="text">Please note that deleted items will be lost forever</p>
                <hr/>
                <div className="text-center">
                    <button className="btn" onClick={this.onCloseModal} style={{marginRight: 10}}>
                        Cancel
                    </button>
                    <button className="btn btn-danger" name={this.props.name} onClick={this.handleDelete}>
                        Delete
                    </button>           
                </div>
            </Modal>
        </span>
    );
  }
}

export default connect("toggle, from, to, is_login, token", actions)(withRouter(ModalDeleteEmployee))