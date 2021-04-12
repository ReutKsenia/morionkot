const express = require('express');
const router = express.Router();
const order = require('../api/order');
const Order = require('../models/order');
const Cart = require('../models/cart');
const OrderStatus = require('../models/orderStatus');
const Role = require('../models/role');
const api = require('../api/auth')
const passport = require('passport'),
      config = require('../config/config.json')

router.post('/addOrder', order.addOrder(Order, Cart, OrderStatus));

router.post('/product-from-category', (req, res) => {
  ProductCategory.findOne({ category_name: req.body.categoryName }).populate('product_id').exec(function(err,post){
    if(err){
      res.sendStatus(500)
    }
    else{
      res.send({ products: post.product_id });
    }
})
});

router.get('/orders-unexecuted-for-manager', function(req, res, next) {
  passport.authenticate('managerStrategy', config.session, function(err, employee) {
    if (employee){
      OrderStatus.find({ sent_to_courier: false}).populate({
        path: 'order_id', 
        model: 'order', 
        populate: {
          path: 'courier_id',
          model: 'employee'
        }}).exec(function(err, orders){
        if (err) {
          return res.sendStatus(401)
        } else {
          console.log(orders);
          return res.send({ orders: orders })
        }
      })
    }else{
      return res.sendStatus(401);
    }
  })(req, res, next);
});

router.get('/orders-executed-for-manager', function(req, res, next) {
  passport.authenticate('managerStrategy', config.session, function(err, employee) {
    if (employee){
      OrderStatus.find({ sent_to_courier: true, visible_for_manager: true}).populate('order_id').exec(function(err, orders){
        if (err) {
          return res.sendStatus(401)
        } else {
          return res.send({ orders: orders })
        }
      })
    }else{
      return res.sendStatus(401);
    }
  })(req, res, next);
});

router.post('/delete-order', function(req, res, next) {
  passport.authenticate('adminManagerStrategy', config.session, function(err, employee) {
    if (employee){
      Order.findById(req.body._id, function(err, ord){
        if(err) return console.log(err);
        if(ord.user_id){
            ord.updateOne({ _id: req.body._id}, {$set: { visible_for_employee: false }}, (err, order) => {
              if(err){
                  res.sendStatus(500)
                }
              else{
                res.sendStatus(200)
              }
          })
        }
        else{
            ord.remove({ _id: req.body._id}, function(err){
                if(err) return console.log(err);
                else{
                    Cart.remove({ order_id: req.body._id }, function(err){
                        if(err) return console.log(err);
                        else res.sendStatus(200);
                    })
                }
            })
        }
    })
    }else{
      return res.sendStatus(401);
    }
  })(req, res, next);
})

router.post('/change-status-order', function(req, res, next) {
  passport.authenticate('managerStrategy', config.session, function(err, employee) {
    if (employee){
      OrderStatus.updateOne({ _id: req.body._id }, { $set: { is_formed: req.body.is_formed, sent_to_courier: req.body.sent_to_courier, canceled: req.body.canceled,  }}, (err, order) => {
        if(err){
            res.sendStatus(500)
          }
        else{
            res.send({ order: order });
        }
    })
    }else{
      return res.sendStatus(401);
    }
  })(req, res, next);
});


router.post('/product-from-cart', order.productsFromCart(Cart))

module.exports = router;