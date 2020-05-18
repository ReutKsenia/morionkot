const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const Cart = new Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    },
    quantity: Number,
    selectedPrice: Number,
    selectedWeight: String
});
 
module.exports = mongoose.model('cart', Cart);