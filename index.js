const express = require('express');
const path = require('path');
const distPath = path.join(__dirname, 'dist/', 'index.html');

const app = express();

app.use(express.static(__dirname + 'dist/'));
app.use(express.static('dist', {
    setHeaders: (res, path, stat) => {
        res.set('Cache-Control', 'public, s-maxage=86400');
    }
}));
app.get('*', function(req, res) {
    res.sendFile(distPath);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}...`);
});
