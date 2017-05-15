import React from 'react';
import ReactDOM from 'react-dom';
import Parallax from 'api/parallax.js';

import Main from 'components/Main.jsx';
import 'bootstrap/dist/css/bootstrap.css';

window.onload = function() {
    ReactDOM.render(
        <Main />,
        document.getElementById('root')
    );
};


var scene = document.getElementById('scene');
var parallax = new Parallax(scene);