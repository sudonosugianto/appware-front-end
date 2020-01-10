import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import DashNav from "../Components/DashNav";
import "../App.css"
import moment from 'moment'
import { withRouter} from 'react-router-dom' 
import { connect } from "unistore/react";
import { actions } from "../store";

const getAllPackages = "https://appware-api.halte.id/api/users/packages";

class TambahAdjustment extends Component {
  state = {
    ListAdmin: [],
    packageActualStocksID : '',
    actual_stock : "",
	notes : "",
	in_stock: '',
     };
  
  HandlepackageActualStocksID = event => {
    this.setState({ packageActualStocksID : event.target.value });
  };
  Handleactual_stock = event => {
    this.setState({ actual_stock : event.target.value });
  };
  Handlenotes = event => {
    this.setState({ notes : event.target.value });
  };

  handlePost = event => {
    event.preventDefault();
    let token = this.props.token;
    console.log(token, "ss");
    const self = this;
    axios
      .post(
        "https://appware-api.halte.id/api/users/actualstock",
        {
            packageActualStocksID: this.state.packageActualStocksID,
            actual_stock: this.state.actual_stock,
            notes: this.state.notes,
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )
      .then(result => {
        self.props.history.push("/inventory/adjustment");
        alert("success");
      })
      .catch(function(error) {
        console.log(error);
        alert("error");
      });
  };
  componentDidMount = () => {
    const token =this.props.token;;
    const self = this;
    const dateBefore = moment(this.props.from, 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss')
    const dateAfter = moment(this.props.to, 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss')
    this.props.getJustSummary(token,dateAfter,dateBefore)
    axios
      .get(getAllPackages, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function(response) {
        // handle success
        self.setState({ ListAdmin : response.data.packages });
        console.log("listadmin", response.data.packages);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    const  ListAdmin  = this.state.ListAdmin;
    const  summary  = this.props.summary;
	// console.log("summary", summary)

	for (let j = 0; j < summary.length; j++) {
		if (summary[j].PackageID == this.state.packageActualStocksID) {
			this.state.in_stock = summary[j].actualStock	
			}
		}

	console.log("in_stock", this.state.in_stock)
	// console.log("package", this.state.packageActualStocksID)

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
                <h4 className="text-center">Create Adjustment</h4>
                <hr />
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-1 col-lg-3'></div>
                        <div className='card col-md-10 col-lg-6'>
                            <div className='card-body'>
                                <form className=' ' onSubmit={this.handlePost}>
                                    <div className="form-group">
                                        <label for="inputState">Package Name</label>
                                        <select id="inputState"  onChange={this.HandlepackageActualStocksID} name='packageActualStocksID' className="form-control">
                                            <option selected>choose...</option>
                                            {
                                                ListAdmin.map((item, key) => {
                                                return  <option value={item.id} name={item.id} >{item['Items.item']} </option>
                                                })
                                                }
                                        </select>
                                    </div>

                                    <div className="form-row">
                                        
                                        <div className="form-group col-md-6">
                                        <fieldset disabled>
                                            <label for="inputPassword4">In Stock</label>
											<input type="text" value={this.state.in_stock} className="form-control" placeholder=""/>
                                            {/* {
                                                summary.map((item, key) => {
                                                return <input type="text" value={item.stock} className="form-control" placeholder=""/>
                                                })
                                                } */}
                                            
                                        </fieldset>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="inputPassword4">Actual Stock</label>
                                            <input type="text" className="form-control" 
                                            onChange={this.Handleactual_stock} name='actual_stock'
                                            placeholder="actual stock"/>
                                        </div>
                                    </div>
                                     
                                    <div className="form-group">
                                        <label for="inputNotes">Notes</label>
                                        <textarea type="text" onChange={this.Handlenotes} name='notes' 
                                        placeholder="put  notes here" className="form-control" />
                                    </div>


                                    <hr></hr>
                                    <div className="text-center">
                                        <Link to='/inventory/adjustment'>
                                            <button type="submit" className="btn" style={{marginRight: 10}}>
                                                Cancel
                                            </button>
                                        </Link>
                                        <button type="submit" className="btn btn-primary table-button">Create</button>
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
// export default TambahAdjustment;
export default connect("toggle, from, to, is_login, token,summary", actions)(withRouter(TambahAdjustment))