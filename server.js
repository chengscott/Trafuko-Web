const express = require('express');
const path = require('path');
const distPath = path.join(__dirname, 'dist/', 'index.html');
const requestLogger = require('./server/src/middleware/request-logger.js');
const errorHandler = require('./server/src/middleware/error-handler.js');

const app = express();

app.use(requestLogger);
app.use(express.static(__dirname + 'dist/'));
app.use(express.static('dist', {
    setHeaders: (res, path, stat) => {
        res.set('Cache-Control', 'public, s-maxage=86400');
    }
}));
app.get('*', function(req, res) {
    res.sendFile(distPath);
});
app.use(errorHandler);

const port = 8080;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}...`);
});
