import './SignIn.css'
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { BrowserRouter, Link, Redirect } from "react-router-dom";
import logo_login from "../Assets/logo_login.png"
import { connect } from "unistore/react";
import { actions } from "../store";

class SignIn extends Component {
	state = {
		email: "",
		password: ""
	};
	changeInput = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		console.log("state", this.state);
		if (this.props.is_login == true) {
			// alert('Please login first!')
			return <Redirect to={{ pathname: "/dashboard" }} />
		}

		return (
			<div>
				<div className="login text-center login-row-middle">
					<div className="container">
						<div className="row">
							<div className="col-md-3 col-xs-12"></div>

							<div className="col-md-6 col-xs-12">
								<img src={logo_login} className="login-logo" alt="" />
								<span className="login-text">AppWare</span>
							</div>

							<div className="col-md-3 col-xs-12"></div>
						</div>
					</div>
				</div>

				<div className="container">
					<div className="row">
						<div className="col-xs-8 col-sm-7 col-md-6 col-lg-5 mx-auto">
							<div className="card card-signin my-5">
								<div className="card-body">
									<h5 className="card-title text-center">Masuk</h5>
									<form className="form-signin" onSubmit={e => e.preventDefault()}>
										<div className="form-label-group">
											<input type="email" id="email_signin"  name='email' onChange={e => this.changeInput(e)} className="form-control" placeholder="alamat email" required  />
										</div>
										<br></br>
										<div className="form-label-group">
											<input type="password" id="password_signin"  name='password' onChange={e => this.changeInput(e)} className="form-control" placeholder="password" required />
										</div>
										<br></br>
										<div>
											<Link to="/dashboard" onClick={() => this.props.postLogin(this.state.email, this.state.password)}>
												<button id='button_signin' className="btn-signin btn btn-primary btn-block button-text" type="submit"><strong>Sign In</strong></button>
											</Link>
										</div>
										<br></br>
										<br></br>
										<div className="text-center">
											<span>Belum punya akun? <span></span>
												<Link to="/signup" className="text-signin">
													Daftar di sini
											</Link>
											</span>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		)
	}
}

export default connect("toggle, from, to, is_login, token", actions)(withRouter(SignIn))