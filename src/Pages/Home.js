import React, { Component } from "react";
import Banner from '../Components/Banner'
import Benefits from '../Components/Benefits'
import Features from '../Components/Features'
import Testimony from '../Components/Testimony'
import Footer from '../Components/Footer'
import NavBar from '../Components/NavBar'
import './Home.css'
import whatsapp from "../Assets/whatsapp-logo.png"


class Home extends Component {
  state = {
    ListPublic: [],  
  };
  render() {
    return (
      <div className="Home">
        <NavBar/>
        <Banner/>
        <Benefits/>
        <Features/>
        <Testimony/>
        <Footer/>
        <div className="wa-chat">
          <a target="_blank" href="https://web.whatsapp.com/send?phone=6281938486386&amp;text=Halo, saya mau tanya tentang AppWare" className="img-icon-a nofocus">
            <img src={whatsapp} alt="WhatsApp Chat" scale="0" style={{height: 50}}/>
          </a>
        </div>
        <div className="chat-mobile">
          <a target="_blank" href="https://wa.me/6281938486386?text=Halo,%20saya%20mau%20tanya%20tentang%20AppWare" className="img-icon-a nofocus">
            <img src={whatsapp} alt="WhatsApp Chat" scale="0" style={{height: 50}}/>
          </a>
        </div>
      </div>
    );
  }
}
export default Home;
