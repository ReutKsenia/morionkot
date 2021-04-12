const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const Role = new Schema({
    role: String
});
 
module.exports = mongoose.model('role', Role);