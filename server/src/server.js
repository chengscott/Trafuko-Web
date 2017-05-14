const express = require('express');
const path = require('path');
const distPath = path.join(__dirname, '../../dist/', 'index.html');

const postRouter = require('./routers/post.js');
const requestLogger = require('./middleware/request-logger.js'); 
const errorHandler = require('./middleware/error-handler.js');
const accessControl = require('./middleware/access-controller.js'); // develop only 

const app = express();

app.use(requestLogger);
app.use(express.static('dist', {
    setHeaders: (res, path, stat) => {
        res.set('Cache-Control', 'public, s-maxage=86400');
    }
}));
app.get('*', function(req, res) {
    res.sendFile(distPath);
});
app.use('/api', accessControl); // develop only 
app.use('/api', postRouter);
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}...`);
});
