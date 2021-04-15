const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Answer = require('../models/answer');

router.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send({ comments: comments })
        }
    });
});

router.get('/answers', (req, res) => {
    Answer.find({}, (err, answers) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send({ answers: answers })
        }
    });
});

module.exports = router;