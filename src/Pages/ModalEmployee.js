import React from 'react';
import Modal from 'react-responsive-modal';
import '../App.css'
import { Link } from "react-router-dom";
import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";


class ModalEmployee extends React.Component {
  state = {
    open: false,
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  render() {
    const { open } = this.state;
    console.log (this.props)
    return (
        <span>        
            <a className="fas fa-eye text-secondary" onClick={this.onOpenModal}></a>
            <Modal open={open} onClose={this.onCloseModal} showCloseIcon={false}>
                <h2 className="text-center">ApiKey</h2>
                <hr/>
                <p className="text">{this.props.ApiKey}</p>
                <hr/>
                <div className="text-center">
                    <button className="btn" onClick={this.onCloseModal} style={{marginRight: 10}}>
                        Close
                    </button>
                </div>
            </Modal>
        </span>
    );
  }
}

export default connect("toggle, from, to, is_login, token", actions)(withRouter(ModalEmployee))