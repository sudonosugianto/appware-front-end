import React from 'react';
import './Banner.css'
import { BrowserRouter, Link } from "react-router-dom";

import logo from '../Assets/logo.png'
import {Animated} from "react-animated-css";



const Banner = () => {
	return (
		<div className="banner">
			<div className="container banner-background" style={{marginTop: 80}}>
				<div className="row row-center">
					<div className="col-xs-12 col-sm-6">
					<Animated animationIn="fadeIn">
						<img src={logo} className="banner-logo" alt="" style={{marginBottom: 30}}></img>
					</Animated>
					</div>
					<div className="col-xs-12 col-sm-6 text-center">
						
						<h1 className="banner-title">Solusi Praktis Manajemen Inventori Online Pengusaha UKM Indonesia</h1>
						
						<div className="row text-left">
							<div className="col-xs-12 col-sm-1"></div>
							<div className="col-xs-12 col-sm-11">
								<p className="banner-text">Mulai Menggunakan dengan 3 Langkah!</p>
								<p className="banner-text">1. Buat Akun AppWare</p>
								<p className="banner-text">2. Download aplikasi AppWare di handphone</p>
								<p className="banner-text">3. Tambahkan produk dan siap bekerja!</p>
							</div>
						</div>
						<div className="banner-button" style={{marginTop: 30, marginBottom: 60}}>
							<Link to="/signup">
								<button type="button" className="btn-banner btn button-text"><strong>MULAI GRATIS SEKARANG</strong></button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Banner;