import React from 'react';
import Modal from 'react-responsive-modal';
import '../App.css'
import { Link } from "react-router-dom";
import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";


class ModalDeleteCategory extends React.Component {
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
    const url = "https://ec2-54-179-157-83.ap-southeast-1.compute.amazonaws.com/api/users/category/";
    const headers = {
      Authorization: "Bearer " + token
    };
    
      this.onCloseModal()
      this.props.DeleteCategory(url,this.props.name,headers).then( ()=> {
      this.props.getAllCategory(token)
      this.props.history.replace("/category")
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

export default connect("toggle, from, to, token, is_login", actions)(withRouter(ModalDeleteCategory))