import * as firebase from "firebase";

const REQUIRED_SCOPES = [
    'public_profile',
    'email',
].join(',');
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

    isUserEqual(facebookAuthResponse, firebaseUser) {
        if (firebaseUser) {
            const providerData = firebaseUser.providerData;
            for (let p of providerData) {
                if (p.providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
                    p.uid === facebookAuthResponse.userID) {
                    // We don't need to re-auth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    }

    login() {
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithPopup(provider).then((result) => {
                // This gives you a Facebook Access Token.
                // The signed-in user info.
                const info = {
                    token: result.credential.accessToken,
                    user: result.user
                };
                resolve(info);
            }).catch((error) => {
                // The firebase.auth.AuthCredential type that was used.
                const errInfo = {
                    errorCode: error.code,
                    errorMessage: error.message,
                    email: error.email,
                    credential: error.credential
                };
                reject(errInfo);
            });
        });
    }

    logout() {
        return new Promise((resolve, reject) => {
            firebase.auth().signOut().then(() => {
                resolve(true);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}
