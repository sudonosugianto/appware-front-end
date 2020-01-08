import React from "react";
import './NotMatch.css'
import logo from '../Assets/logo_transparent.png'
import { BrowserRouter, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

const NotMatch = props => {
	const pathname = window.location.pathname;
	return (
		<div>		
			<div>
				<div className="container text-center">
					<div className="row row-center">
						<div className="col-xs-10 col-sm-10" style={{margin: "auto", marginTop: "9%"}}>
						<img src={logo} style={{height: 200, marginBottom: 10}}/>
						<h6></h6>
						<h1 style={{marginBottom: 20}}>
							<strong>Maaf.</strong>
						</h1>
						<h6 className="text-secondary">
							Halaman yang anda cari belum tersedia.
						</h6>
						<h6 className="text-secondary" style={{marginTop: 0 }}>
							Silahkan kembali ke halaman Beranda.
						</h6>
						<div className="notmatch-button" style={{marginTop: 30}}>
							<Link to="/">
								<button type="button" className="btn-notmatch btn btn-primary button-text"><strong>Beranda</strong></button>
							</Link>
						</div>
					</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotMatch;