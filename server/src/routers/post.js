const express = require('express');
const bodyParser = require('body-parser');
const postModel = require('../model/post.js');
const router = express.Router();

router.use(bodyParser.json());

// Create
router.post('/posts', function(req, res) {
    const {color, text} = req.body;
    console.log(req.body);
    if (!color || !text) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    postModel.create(color, text).then(post => {
        res.json(post);
    });
});

module.exports = router;
