const auth = require('./auth');

const api = {};

api.addOrder = (order, cart, orderStatus) => (req, res) => {
    if(req.body.User){
        order.create({delivery_date: req.body.Order.delivery_date,
            cost: req.body.Order.cost, delivery_adress: req.body.Order.delivery_adress, time: req.body.Order.time,
            phone_number: req.body.Order.phone_number, payment_method: req.body.Order.payment_method, comment: req.body.Order.comment,
            status: req.body.Order.status, way_of_reception: req.body.Order.way_of_reception,
            customer_name: req.body.Order.customer_name, user_id: req.body.User, courier_id: null} , function(err, or){
            if(err) return console.log(err);
            else{
            for(let i=0; i < req.body.Cart.length; i++){
            cart.create({product_id: req.body.Cart[i]._id, order_id: or._id, quantity: req.body.Cart[i].quantity, 
                selectedPrice: req.body.Cart[i].selectedPrice, selectedWeight: req.body.Cart[i].selectedWeight}), function(err){
                    if(err) return console.log(err);
                }
            }
            orderStatus.create({is_formed: false, sent_to_courier: false, delivered: false, received: false, canceled: false,
                visible_for_manager: true, visible_for_courier: true, order_id: or._id}, function(err){
                    if(err) return console.log(err);
                })
            res.sendStatus(200)
        }
        });
    }
    else{
        order.create({delivery_date: req.body.Order.delivery_date,
            cost: req.body.Order.cost, delivery_adress: req.body.Order.delivery_adress, time: req.body.Order.time,
            phone_number: req.body.Order.phone_number, payment_method: req.body.Order.payment_method, comment: req.body.Order.comment,
            status: req.body.Order.status, way_of_reception: req.body.Order.way_of_reception,
            customer_name: req.body.Order.customer_name, user_id: null, courier_id: null}, function(err, or){
            if(err) return console.log(err);
            else{
            for(let i=0; i < req.body.Cart.length; i++){
            cart.create({product_id: req.body.Cart[i]._id, order_id: or._id, quantity: req.body.Cart[i].quantity, 
                selectedPrice: req.body.Cart[i].selectedPrice, selectedWeight: req.body.Cart[i].selectedWeight}), function(err){
                    if(err) return console.log(err);
                }
            }
            orderStatus.create({is_formed: false, sent_to_courier: false, delivered: false, received: false, canceled: false, 
                visible_for_manager: true, visible_for_courier: true, order_id: or._id}, function(err){
                    if(err) return console.log(err);
                })
            res.sendStatus(200)
        }
        });
    }
}

api.deleteOrder = (order, cart) => (req, res) => {
    order.findById(req.body._id, function(err, ord){
        if(err) return console.log(err);
        else if(ord.user_id){
            order.updateOne({ _id: req.body._id}, {$set: { visible_for_employee: false }})
            res.sendStatus(200);
        }
        else{
            order.remove({ _id: req.body._id}, function(err){
                if(err) return console.log(err);
                else{
                    cart.remove({ order_id: req.body._id }, function(err){
                        if(err) return console.log(err);
                        else res.sendStatus(200);
                    })
                }
            })
        }
    })
    
}

api.productsFromCart = (cart) => (req, res) => {
    cart.find({ order_id: req.body._id}).populate('product_id').exec(function(err,products){
        if(err){
          res.sendStatus(500)
        }
        else{
          res.send({ products: products });
        }
    })
}

api.changeStatusOrder = (Order) => (req, res) => {
    Order.findAndUpdateOne({ _id: req.body._id }, { $set: { status: req.body.status }}, (err, order) => {
        if(err){
            res.sendStatus(500)
          }
        else{
            res.send({ order: order });
        }
    })
}
module.exports = api;