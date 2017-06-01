import React from 'react';
import Parallax from 'parallax-js';

import './Background.css';

export default class Background extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (screen.width >= 1024) {
            const scene = document.getElementById('scene');
            new Parallax(scene, {
                scalarY: 0,
                scalarX: -10
            });
        }
    }

    render() {
        return (
             <div id="container" className="container bg" >
                        <div className="bgg"></div>
                        <img className="layer bg" data-depth="0.30" style={{width: "70%", height: "70%", margin:"20% 0% 0% 15%"}} alt="" src="images/logo.svg"></img>
                <div id="scene" className="obj bg" style={{width: "100%", height: "100%"}}>
                        <img className="layer bg" data-depth="0.30" style={{width: "60%", height: "40%", margin:"10% 10% 10% 30%"}} alt="" src="images/p2.png"></img>
                        <img className="layer bg" data-depth="0.70" style={{width: "60%", height: "50%", margin:"10% 10% 10% 30%"}} alt="" src="images/p3.png"></img>
                        <img className="layer bg" data-depth="1.00" style={{width: "60%", height: "22%", margin:"35% 0% 0% 20%"}} alt="" src="images/p4.png"></img>
                </div>
            </div>
        );
    }
}
