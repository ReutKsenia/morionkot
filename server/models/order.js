const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const Order = new Schema({
    delivery_date: String,
    cost: Number,
    delivery_adress: String,
    time: String,
    phone_number: String,
    payment_method: String,
    comment: String,
    way_of_reception: String,
    customer_name: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    courier_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    }
});
 
module.exports = mongoose.model('order', Order);
