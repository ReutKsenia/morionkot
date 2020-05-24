const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

router.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send({ comments: comments })
        }
    });
});

module.exports = router;