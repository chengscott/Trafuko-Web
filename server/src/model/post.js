const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function create(color, text) {
    return new Promise((resolve, reject) => {
        const newPost = {
            color: color,
            text: text            
        };
        fs.writeFile('data-posts.json', JSON.stringify(newPost), err => {
            if (err) reject(err);

            resolve(true);
        });
    });
}
module.exports = {
    create
};
