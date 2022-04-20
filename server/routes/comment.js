const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Answer = require('../models/answer');
const commentController = require('../api/comment');

router.get('/comments', commentController.getComments(Comment));

router.get('/answers', commentController.getAnswers(Answer));

module.exports = router;