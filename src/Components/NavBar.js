import React from 'react';
import './NavBar.css'
import { BrowserRouter, Link } from "react-router-dom";



const NavBar = () => {
	return (
		<div>
			<nav className="navbar navbar-front navbar-expand-lg navbar-light bg-white fixed-top">
				<div className="container">
					<a className="navbar-brand" href="#"><strong>AppWare</strong></a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarsExample07">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item active nav-text">
								<a className="nav-link" href="tel:081938486386" style={{ padding: 0 }}>
									<span className="nav-text-phone">
										<i className="fas fa-phone" style={{ marginRight: 10 }}></i>
											1500 300
									</span>
								</a>
							</li>
						</ul>

						<ul className="navbar-nav mr-auto">
							<li className="nav-item active">
								<a className="nav-link" href="#">Tentang</a>
							</li>
							<li className="nav-item active">
								<a className="nav-link" href="#">Fitur</a>
							</li>
							<li className="nav-item active">
								<a className="nav-link" href="http://docs.appware.tech" target="_blank">API</a>
							</li>
						</ul>

						<div>
							<ul className="navbar-nav mr-auto">
								<li className="nav-item active">
									<Link className="nav-link" to="/signup">Register</Link>
								</li>
								<li className="nav-item active">
									<Link className="nav-link" to="/signin"><span className="nav-text">Sign In</span></Link>
								</li>
							</ul>
						</div>			
					</div>
				</div>
			</nav>
		</div>
	)
}

export default NavBar;