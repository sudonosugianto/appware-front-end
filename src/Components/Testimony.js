import React from 'react';
import './Testimony.css'

import oki from '../Assets/oki.jpeg';
import sudono from '../Assets/sudono.jpeg';
import karimah from '../Assets/karimah.jpeg';

import {AnimatedOnScroll} from "react-animated-css-onscroll";



const Testimony = () => {
	return (
		<div className="container text-center" style={{ marginTop: 60}}>
			<AnimatedOnScroll animationIn="fadeIn">
			<div style={{ marginBottom: 60 }}>
				<h2>Cerita Pengguna</h2>
			</div>
			<div className="row">
				<div className="col-xs-12 col-sm-4" style={{ marginBottom: 30, paddingRight: 30, paddingLeft: 30 }}>
					<div className="card-testimony card">
						<img className="card-img-top rounded-circle features-logo center" src={oki} style={{marginTop: 30}} />
						<div className="card-body">
							<h5 className="card-title">Oki Putra</h5>
							<h6 className="card-title"><strong>Glodok Electronics</strong></h6>
							<br></br>
							<p className="card-text testimony-text font-italic">
								Puas pakai AppWare! Tampilan simpel dan mudah digunakan. Sebagai pemilik franchise saya bisa memantau penjualan tanpa harus langsung datang ke gerai. Customer support-nya juga sangat responsif !
							</p>
						</div>
					</div>
				</div>

				<div className="col-xs-12 col-sm-4" style={{ marginBottom: 30, paddingRight: 30, paddingLeft: 30 }}>
				<div className="card-testimony card">
						<img className="card-img-top rounded-circle features-logo center" src={sudono} style={{marginTop: 30}} />
						<div className="card-body">
							<h5 className="card-title">Sudono Sugianto</h5>
							<h6 className="card-title"><strong>M2 Mobile</strong></h6>
							<br></br>
							<p className="card-text testimony-text font-italic">
								AppWare sangat berguna sebagai program kasir untuk retail, praktis, user friendly dan sudah bisa memenuhi kebutuhan system di retail business
							</p>
						</div>
					</div>
				</div>

				<div className="col-xs-12 col-sm-4" style={{ marginBottom: 30, paddingRight: 30, paddingLeft: 30 }}>
				<div className="card-testimony card">
						<img className="card-img-top rounded-circle features-logo center" src={karimah} style={{marginTop: 30}} />
						<div className="card-body">
							<h5 className="card-title">Karimah Nurusysyabani</h5>
							<h6 className="card-title"><strong>LampuKu</strong></h6>
							<br></br>
							<p className="card-text testimony-text font-italic">
								AppWare sangat mudah digunakan, fiturnya banyak dan berguna. Saya suka dengan laporan rekap kas yang bisa digunakan untuk mengetahui angka penjualan secara cepat dan akurat
							</p>
						</div>
					</div>
				</div>
			</div>
			</AnimatedOnScroll>
		</div>
	)
}

export default Testimony;