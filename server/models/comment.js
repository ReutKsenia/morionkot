const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const Comments = new Schema({
    username: String,
    comment: String,
});
 
module.exports = mongoose.model('comment', Comments);