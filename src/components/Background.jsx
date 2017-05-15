import React from 'react';
import Parallax from 'parallax-js';

import './Background.css';

export default class Background extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const scene = document.getElementById('scene');
        new Parallax(scene);
    }

    render() {
        return (
            <div id="container" className="container">
                <div data-depth="0.00"><img className="bg" src="images/bg.jpg"/></div>
                <div id="scene" className="scene bg">
                    <div className="layer bg" data-depth="0.10"><img className="big" src="images/object1.png"/></div>
                    <div className="layer bg" data-depth="0.30"><img className="big" src="images/object5.png"/></div>
                    <div className="layer bg" data-depth="0.70"><img className="bgg" src="images/fish4.png"/></div>
                    <div className="layer bg" data-depth="0.90"><img className="bgg" src="images/fish3.png"/></div>
                </div>
            </div>
        );
    }
}
