import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
// Import Componet
// import Navigation from "./Components/Navigation";
// import Footer from "./Components/Footer"
import MainRoute from "./Routes/MainRoute";


class AppRoute extends Component { 
  postSignout = () => {
    localStorage.removeItem("is_login");
    localStorage.removeItem("token");
    // localStorage.clear()
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="App">
        {/* <Navigation 
        postSignout={this.postSignout}/> */}
        <MainRoute/>
        {/* <Footer/>    */}
      </div>
    );
  }
}

export default withRouter(AppRoute);
