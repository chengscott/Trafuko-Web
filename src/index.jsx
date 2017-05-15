import React from 'react';
import {render} from 'react-dom';
import * as firebase from "firebase";

import Main from 'components/Main.jsx';
import 'bootstrap/dist/css/bootstrap.css';

const config = {
    apiKey: "AIzaSyDUfoL0DdG_VDo5ijtZRqvVACwXQMARZrc",
    authDomain: "test-efd03.firebaseapp.com",
    databaseURL: "https://test-efd03.firebaseio.com",
    storageBucket: "test-efd03.appspot.com",
};

render(
    <Main firebase={firebase.initializeApp(config).database().ref()} />,
    document.getElementById('root')
);
