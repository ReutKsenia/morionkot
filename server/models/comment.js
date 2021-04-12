const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const Comments = new Schema({
    username: String,
    comment: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});
 
module.exports = mongoose.model('comment', Comments);