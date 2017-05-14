const fs = require('fs');

function list() {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-posts.json')) {
            fs.writeFileSync('data-posts.json', '');
        }

        fs.readFile('data-posts.json', 'utf8', (err, data) => {
            if (err) reject(err);
            
            let posts = data ? JSON.parse(data) : [];
            resolve(posts);
        });
    });
}
function create(color, text) {
    return new Promise((resolve, reject) => {
        const newPost = {
            color: color,
            text: text            
        };

        list().then( posts => {
            
            posts = [
                newPost,
                ...posts
            ];
            fs.writeFile('data-posts.json', JSON.stringify(posts), err => {
                if (err) reject(err);

                resolve(true);
            });
        });
    });
}
module.exports = {
    create
};
