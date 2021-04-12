const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const OrderStatus = new Schema({
    is_formed: Boolean,
    sent_to_courier: Boolean,
    delivered: Boolean,
    received: Boolean,
    canceled: Boolean,
    visible_for_manager: Boolean,
    visible_for_courier: Boolean,
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    }
});
 
module.exports = mongoose.model('order_status', OrderStatus);
