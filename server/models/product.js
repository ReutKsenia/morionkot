const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const Product = new Schema({
    image: [],
    name: String,
    price: [],
    weight: [],
    description: String
});
 
module.exports = mongoose.model('product', Product);