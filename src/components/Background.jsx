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
                        <img className="layer bg" data-depth="0.30" id="logo" src="./images/logo.svg"></img>
                <div id="scene" className="obj bg" style={{width: "100%", height: "100%"}}>
                        <img className="layer bg" data-depth="0.80" id="o6" src="./images/6.png"></img>
                        <img className="layer bg" data-depth="1.00" id="o2" src="./images/2.png"></img>
                        <img className="layer bg" data-depth="0.10" id="o3" src="./images/3.png"></img>
                        <img className="layer bg" data-depth="0.40" id="o4" src="./images/4.png"></img>
                        <img className="layer bg" data-depth="0.35" id="o5" src="./images/5.png"></img>
                        <img className="layer bg" data-depth="0.15" id="o1" src="./images/1.png"></img>
                        <img className="layer bg" data-depth="0.30" id="o7" src="./images/7.png"></img>
                        <img className="layer bg" data-depth="0.30" id="o9" src="./images/9.png"></img>
                        <img className="layer bg" data-depth="0.60" id="o10" src="./images/10.png"></img>
                </div>
            </div>
        );
    }
}
