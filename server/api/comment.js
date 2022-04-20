const api = {};

api.getComments = (Comment) => (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send({ comments: comments })
        }
    });
}

api.getAnswers = (Answer) => (req, res) => {
    Answer.find({}, (err, answers) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send({ answers: answers })
        }
    });
}

module.exports = api;