import React from 'react';
import {Parallax} from 'react-parallax';

export default class Background extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="container" class="container">
                <div data-depth="0.00"><img class="bg" src="images/bg.jpg"/></div>
                <div id="scene" class="scene bg">
                    <div class="layer bg" data-depth="0.10"><img class="big" src="images/object1.png"/></div>
                    <div class="layer bg" data-depth="0.30"><img class="big" src="images/object5.png"/></div>
                    <div class="layer bg" data-depth="0.70"><img class="bgg" src="images/fish4.png"/></div>
                    <div class="layer bg" data-depth="0.90"><img class="bgg" src="images/fish3.png"/></div>
                </div>
            </div>
        );
    }
}
