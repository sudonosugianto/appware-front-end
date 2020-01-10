import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import "../App.css"

import { withRouter } from 'react-router-dom'
import { connect } from "unistore/react";
import { actions } from "../store";

class TambahCategory extends Component {
  state = {
    ListAdmin: [],
    category: ""
  };

  HandleCategories = event => {
    this.setState({ category: event.target.value });
  };

  handlePost = event => {
    event.preventDefault();
    let token = this.props.token;
    console.log(token, "ss");
    const self = this;
    axios
      .post(
        "https://appware-api.halte.id/api/users/category",
        {

          category: this.state.category
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )
      .then(result => {
        self.props.history.push("/category");
        alert("success");
      })
      .catch(function (error) {
        console.log(error);
        alert("error");
      });
  };
  render() {
    return (
      <div className='wrapper'>
        <DashNav toggle={this.props.toggle} />
        <div id="content">
          <div className="container" style={{ margin: 0 }}>
            <button type="button" id="sidebarCollapse" className="btn table-button" onClick={() => this.props.switchToggle()}>
              <i className="fa fa-chevron-left strong"
                className={this.props.toggle ? ' fa fa-chevron-left strong rotate down' : 'fa fa-chevron-right strong rotate up'}
              />
            </button>
          </div>
          <br />
          <br />
          {/* Main Content */}
          <h4 className="text-center">Add Category</h4>
          <hr />
          <div className='container'>
            <div className='row'>
              <div className='col-md-1 col-lg-3'></div>
              <div className='card col-md-10 col-lg-6'>
                <div className='card-body'>
                  <form className=' ' onSubmit={this.handlePost}>

                    <div className="form-group">
                      <label for="inputNotes">Category</label>
                      <input type="text" name='category' id='tambah_category' onChange={this.HandleCategories} className="form-control" placeholder=" item category" required/>
                    </div>
                    <hr></hr>
                    <div className="text-center">
                      <Link to='/category'>
                        <button type="submit" className="btn" style={{ marginRight: 10 }}>
                          Cancel
                        </button>
                      </Link>
                      <button id='button_category' type="submit" className="btn btn-primary table-button">Add</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// export default TambahCategory;
export default connect("toggle, from, to, is_login, token", actions)(withRouter(TambahCategory))