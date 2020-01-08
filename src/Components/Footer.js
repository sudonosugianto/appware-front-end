import React from 'react';
import './Footer.css'



const Footer = () => {
    return (
        <div className="footer text-white" style={{paddingBottom: 60}}>
            <div className="container" style={{marginTop: 30, paddingTop: 60}}>
                <div className="row text-center" style={{marginBottom: 60}}>
                    <div className="col">
                        <h2>AppWare</h2>
                        <p>&#169; ZackReaper 2018</p>
                    </div>
                </div>

                <div className="row footer-center">
                    <div className="col-xs-12 col-sm-2"></div>

                    <div className="col-xs-12 col-sm-3" style={{marginBottom: 30}}>
                        <h6 className="footer-text-color">BANTUAN</h6>
                        <br></br>
                        <div className="footer-text-height">
                            <p>Penjelasan Fitur</p>
                            <p>Cerita Konsumen</p>
                            <p>Harga</p>
                            <p>Request Demo</p>
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-3" style={{marginBottom: 30}}>
                        <h6 className="footer-text-color">TENTANG KAMI</h6>
                        <br></br>
                        <div className="footer-text-height">
                            <p>Tentang AppWare</p>
                            <p>Cara Pakai AppWare</p>
                            <p>Kebijakan Privasi</p>
                            <p>Karier</p>
                        </div>

                    </div>

                    <div className="col-xs-12 col-sm-3" style={{marginBottom: 30}}>
                        <h6 className="footer-text-color">HUBUNGI KAMI</h6>
                        <br></br>
                        <div className="footer-text-height">
                            <a href="tel:081938486386">
                                <p><i className="fas fa-phone" style={{marginRight: 10}}></i>1500 300</p>
                            </a>

                            <a href="mailto:sudonosugianto@outlook.com">
                                <p><i className="fas fa-envelope" style={{marginRight: 10}}></i>support@appware.com</p>
                            </a>

                            <a href="https://goo.gl/maps/HQSZTJkVTDk" target="_blank">
                                <p><i className="fas fa-map-marked-alt" style={{marginRight: 10}}></i>AppWare Tower</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;