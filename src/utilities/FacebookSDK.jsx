const APP_ID = '1906255912956108';
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
