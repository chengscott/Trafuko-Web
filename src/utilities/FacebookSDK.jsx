const REQUIRED_SCOPES = [
    'public_profile',
    'email',
].join(',');

import * as firebase from "firebase";
const provider = new firebase.auth.FacebookAuthProvider();

export default class FacebookSDK {
    constructor() {

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.isUserEqual = this.isUserEqual.bind(this);

        if (typeof window !== 'undefined') {
            this.init();
        }
    }

    init() {

        provider.addScope(REQUIRED_SCOPES);
        provider.setCustomParameters({
            'display': 'popup'
        });

    }

    
    //firebase.auth().onAuthStateChanged(function(firebaseUser) {}
    isUserEqual(facebookAuthResponse, firebaseUser) {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === facebookAuthResponse.userID) {
                    // We don't need to re-auth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    }

    login() {

        return new Promise((resolve,reject) => {
            /*firebase.auth().signInWithRedirect(provider);
            firebase.auth().getRedirectResult().then(function(result) {
                var info = {
                    token: result.credential.accessToken,
                    user: result.user
                };

                resolve(info);
            }).catch(function(error) {
                var errInfo = {
                    errorCode: error.code,
                    errorMessage: error.message,
                    email: error.email,
                    credential: error.credential
                };

                reject(errInfo);
            });*/
            firebase.auth().signInWithPopup(provider).then(function(result) {
              // This gives you a Facebook Access Token. You can use it to access the Facebook API.
              // The signed-in user info.
                var info = {
                    token: result.credential.accessToken,
                    user: result.user
                };

                resolve(info);
              // ...
            }).catch(function(error) {
              // Handle Errors here.

              // The email of the user's account used.
              // The firebase.auth.AuthCredential type that was used.
                var errInfo = {
                    errorCode: error.code,
                    errorMessage: error.message,
                    email: error.email,
                    credential: error.credential
                };

                reject(errInfo);
              // ...
            });
        });
    }
    logout(){

        return new Promise((resolve,reject) => {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                resolve(true);
            }).catch(function(error) {
                // An error happened.
                reject(error);
            });
        });
    }
}

/*
/*const APP_ID = '1906255912956108';
const SDK_VERSION = 'v2.9';
const REQUIRED_SCOPES = [
    'public_profile',
    'email',
].join(',');


export default class FacebookSDK {
    constructor() {

        this.login = this.login.bind(this);


        if (typeof window !== 'undefined') {
            this.init();
        }
    }

    init() {

        global.fbAsyncInit = () => {
            global.FB.init({
                appId: APP_ID,
                xfbml: true,
                version: SDK_VERSION,
            });
            this.FB = global.FB;
        };

        (function loadFacebookJSSDK(d, s, id) {
            const fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            const js = d.createElement(s); js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    login() {

        return new Promise((resolve) => {
            this.FB.login(resolve, {
                scope: REQUIRED_SCOPES,
            });
        });
    }
}
*/
