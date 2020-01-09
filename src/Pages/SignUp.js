import React, { Component } from "react";
import axios from "axios";

import './SignUp.css'
import logo_login from "../Assets/logo_login.png"

class SignUp extends Component {
	state = {
	  fullname : "",
	  username : "",
	  password : "",
	  email : "",
	  phone_number : ""
	};
  
	HandleFullname = event => {
	  this.setState({ fullname: event.target.value });
	};
	HandleUsername = event => {
	  this.setState({ username: event.target.value });
	};
	HandlePassword = event => {
	  this.setState({ password: event.target.value });
	};
	Handleemail = event => {
		this.setState({ email: event.target.value });
	};
	HandlePhone_number = event => {
		this.setState({ phone_number: event.target.value });
	};
	
	
	handlePost = event => {
	  event.preventDefault();
	  const self = this;
	  axios
		.post("http://ec2-54-255-236-0.ap-southeast-1.compute.amazonaws.com/api/users", {
		  fullname: this.state.fullname,
		  username: this.state.username,
		  password: this.state.password,
		  email: this.state.email,
		  phone_number: this.state.phone_number,
		  
		})
		.then(result => {
		  self.props.history.push("/signin");
		  alert("success");
		})
		.catch(function(error) {
		  console.log(error);
		  alert("maaf email/no telfon anda sudah terdaftar");
		});
	};
	render() {
	  return (
		<div>
			<div className="login text-center login-row-middle">
				<div className="container">
					<div className="row">
						<div className="col-md-3 col-xs-12"></div>

						<div className="col-md-6 col-xs-12">			
								<img src={logo_login} className="login-logo" alt=""/>
								<span className="login-text">AppWare</span>
						</div>
						
						<div className="col-md-3 col-xs-12"></div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row">
					<div className="signup col-xs-8 col-sm-7 col-md-6 col-lg-5 mx-auto">
						<div className="card card-signin my-5">
							<div className="card-body">
								<h5 className="card-title text-center">Daftar</h5>
								<form className="form-signin" onSubmit={this.handlePost}>

                                    <div className="form-label-group">
										<input type="text" id="nama_lengkap" onChange={this.HandleFullname} name="fullname" className="form-control" placeholder="nama lengkap" required autofocus/>	
									</div>
									<br></br>
									<div className="form-label-group">
										<input type="text" id="nama_user" className="form-control" onChange={this.HandleUsername} name='username' placeholder="username" required autofocus/>	
									</div>
									<br></br>
									<div className="form-label-group">
										<input type="text" id="no_telpon" className="form-control" name='phone_number' onChange={this.HandlePhone_number} placeholder="nomor telepon" required autofocus/>	
									</div>
									<br></br>

									<div className="form-label-group">
										<input type="email" id="email_user" className="form-control" placeholder="alamat email" name="email" onChange={this.Handleemail} required autofocus/>	
									</div>
									<br></br>

									<div className="form-label-group">
										<input type="password" id="password_user" name='password' onChange={this.HandlePassword} className="form-control" placeholder="password" required/>
									</div>
									<br></br>
									
                                    <div>
										<a href="/dashboard">
											<button id='registrasi_button' className="btn-signin btn btn-primary btn-block button-text" type="submit"><strong>Buat Akun</strong></button>
										</a>
									</div>
									<br></br>
									<br></br>
									
                                    <div className="text-center text-muted">
										<small>Dengan menekan Buat Akun, saya mengkonfirmasi telah menyetujui Syarat dan Ketentuan, serta Kebijakan Privasi AppWare.<span></span>
											<a href="">
												
											</a>
										</small>
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

export default SignUp;