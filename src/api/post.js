import axios from 'axios';

// Develop server URL
const postBaseUrl = 'http://localhost:3000/api';

// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
//const postBaseUrl = 'http://weathermood-8.us-west-2.elasticbeanstalk.com/api';
//const postBaseUrl = 'http:/localhost:8080/api';

export function createPost(color, text) {
    let url = `${postBaseUrl}/posts`;

    //console.log(`Making POST request to: ${url}`);
    return axios.post(url, {
        color,
        text
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}