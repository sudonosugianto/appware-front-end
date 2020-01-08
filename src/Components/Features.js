import React from 'react';
import './Features.css'

import report from '../Assets/report.svg';
import savemoney from '../Assets/savemoney.svg';
import stock from '../Assets/stock.svg';

import {AnimatedOnScroll} from "react-animated-css-onscroll";



const Features = () => {
	return (
        <div className="features">    
            <div className="container text-center" style={{paddingTop: 70, marginTop: 30 ,paddingBottom: 90}}>
                <div style={{marginBottom: 90}}>
                    <h2>Mengapa AppWare ?</h2>
                </div>
            <AnimatedOnScroll animationIn="fadeInUp">
                <div className="row">
                    <div className="col-xs-12 col-sm-4" style={{marginBottom: 30, paddingRight: 30, paddingLeft: 30}}>
                        <img src={savemoney} className="features-logo" alt="" style={{marginBottom: 30}}></img>
                        <h4>Murah</h4>
    
                        <p>AppWare tersedia dengan harga terjangkau</p>
                    </div>
                    <div className="col-xs-12 col-sm-4" style={{marginBottom: 30, paddingRight: 30, paddingLeft: 30}}>
                        <img src={report} className="features-logo" alt="" style={{marginBottom: 30}}></img>
                        <h4>Laporan</h4>

                        <p>Pantau laporan penjualan harian dimanapun</p>
                    </div>
                    <div className="col-xs-12 col-sm-4" style={{marginBottom: 30, paddingRight: 30, paddingLeft: 30}}>
                        <img src={stock} className="features-logo" alt="" style={{marginBottom: 30}}></img>
                        <h4>Stok</h4>

                        <p>Kelola stok bisnis Anda dengan mudah, kapanpun</p>
                    </div>
                </div>
            </AnimatedOnScroll>
            </div>
        </div>
	)
}

export default Features;