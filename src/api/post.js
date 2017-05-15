import axios from 'axios';

// Develop server URL
// const postBaseUrl = 'http://localhost:3000/api';

// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
const postBaseUrl = 'http://test-efd03.firebaseio.com';

export function createPost(color, text) {
    let url = `${postBaseUrl}/posts.json`;

    return axios.put(url, {
        color,
        text
    }).then(function(res) {
        if (res.status !== 200) {
            throw new Error(`Unexpected response code: ${res.status}`);
        }
        return res.data;
    });
}
