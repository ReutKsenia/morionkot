const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const Order = new Schema({
    delivery_date: String,
    cost: Number,
    delivery_adress: String,
    phone_number: String,
    payment_method: String,
    status: Boolean,
    way_of_reception: String,
    customer_name: String,
});
 
module.exports = mongoose.model('order', Order);
