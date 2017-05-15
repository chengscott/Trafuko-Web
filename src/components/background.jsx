import React from 'react';
import Parallax from 'api/parallax.js';

export default class Background extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var scene = document.getElementById('scene');
        var parallax = new Parallax(scene);
    }
    render() {
        return(
            <div id="container" class="container">
                <div id="scene" class="scene">
                    <div class="layer" data-depth="1.00"><img src="images/layer1.png"></div>
                    <div class="layer" data-depth="0.80"><img src="images/layer2.png"></div>
                    <div class="layer" data-depth="0.60"><img src="images/layer3.png"></div>
                    <div class="layer" data-depth="0.40"><img src="images/layer4.png"></div>
                    <div class="layer" data-depth="0.20"><img src="images/layer5.png"></div>
                    <div class="layer" data-depth="0.00"><img src="images/layer6.png"></div>
                </div>
            </div>
            );
    }
}