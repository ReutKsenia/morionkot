const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const Answers = new Schema({
    answer: String,
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    },
});
 
module.exports = mongoose.model('answer', Answers);