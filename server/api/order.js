const mongoose = require('mongoose'),
      config = require('../config/config.json');

const api = {};

api.addOrder = (order, cart) => (req, res) => {
    order.create({delivery_date: req.body.Order.delivery_date,
        cost: req.body.Order.cost, delivery_adress: req.body.Order.delivery_adress,
        phone_number: req.body.Order.phone_number, payment_method: req.body.Order.payment_method,
        status: req.body.Order.status, way_of_reception: req.body.Order.way_of_reception,
        customer_name: req.body.Order.customer_name, products_id: req.body.Order.products_id}, function(err, or){
        if(err) return console.log(err);
        else{
        for(let i=0; i < req.body.Cart.length; i++){
        cart.create({product_id: req.body.Cart[i]._id, order_id: or._id, quantity: req.body.Cart[i].quantity, 
            selectedPrice: req.body.Cart[i].selectedPrice, selectedWeight: req.body.Cart[i].selectedWeight}), function(err){
                if(err) return console.log(err);
                else { console.log("Сохранен объект order", cart); res.sendStatus(200)}
                
            }
        }
    }
    });
}

module.exports = api;