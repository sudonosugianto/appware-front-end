import React from 'react';
import Modal from 'react-responsive-modal';
import DatePicker from '../Components/DatePicker'
import '../App.css'
import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";
import moment from 'moment'

class ModalDatePicker extends React.Component {
  state = {
    open: false,
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    const token = this.props.token;
    this.setState({ open: false });
    const dateBefore = moment(this.props.from, 'YYYY-MM-DD').format('YYYY-MM-DD')
    const dateAfter = moment(this.props.to, 'YYYY-MM-DD').format('YYYY-MM-DD')
    this.props.getAllTransactions(token,dateBefore,dateAfter)
    this.props.getAllSummary(token,dateBefore,dateAfter)
    this.props.getAllPurchaseOrder(token,dateBefore,dateAfter)
    this.props.getAllSales(token,dateBefore,dateAfter)
  };

  render() {
    const { open } = this.state;
    const dateBefore = moment(this.props.from, 'YYYY-MM-DD').format('YYYY-MM-DD')
    const dateAfter = moment(this.props.to, 'YYYY-MM-DD').format('YYYY-MM-DD')
   
    return (
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6" style={{marginBottom: 5, marginTop: 5}}>
            <input value={dateBefore} type="date" className="form-control appware-form" 
              onClick={this.onOpenModal}>
            </input>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6" style={{marginBottom: 5, marginTop: 5}}>
            <input value={dateAfter} type="date" className="form-control appware-form" 
              onClick={this.onOpenModal}>
            </input>
          </div>
        
          <Modal open={open} onClose={this.onCloseModal} showCloseIcon={false}>
              <DatePicker />
          </Modal>
        </div>
    );
  }
}

export default connect("toggle, from, to, is_login, token", actions)(withRouter(ModalDatePicker))