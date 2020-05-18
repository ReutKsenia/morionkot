const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const ProductCategory = new Schema({
    category_name: String,
    product_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }]
});
 
module.exports = mongoose.model('product_category', ProductCategory);