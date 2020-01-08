import React from 'react';
import './Benefits.css'

import person from '../Assets/person.png';
import {AnimatedOnScroll} from "react-animated-css-onscroll";


const Benefits = () => {
    return (
        <div className="container" style={{marginBottom: 40}}>
            <div className="row row-center">

                <div className="col-xs-12 col-sm-6">
                    <AnimatedOnScroll animationIn="fadeInLeft" animationOut="fadeOut">
                        <h2>Hidup Jadi Mudah</h2>
                    </AnimatedOnScroll>
                    <div>
                        <AnimatedOnScroll animationIn="fadeInLeft" animationOut="fadeOut">
                            <p className="banner-text">Nikmati kemudahan mengelola inventori hanya dengan sentuhan jari anda.</p>
                        </AnimatedOnScroll>
                    </div>
                </div>

                <div className="col-xs-12 col-sm-6">
                    <img src={person} className="person-logo rounded-circle" alt=""></img>
                </div>
            </div>
        </div>
    )
}

export default Benefits;