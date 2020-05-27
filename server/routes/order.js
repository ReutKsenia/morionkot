const express = require('express');
const router = express.Router();
const order = require('../api/order');
const Order = require('../models/order');
const Cart = require('../models/cart');

router.post('/addOrder', order.addOrder(Order, Cart));

router.get('/orders', (req, res) => {
    Order.find({}, (err, orders) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send({ orders: orders })
      }
    });
  })

  router.post('/delete-order', order.deleteOrder(Order, Cart));

  router.post('/product-from-cart', order.productsFromCart(Cart))

module.exports = router;