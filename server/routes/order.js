const express = require('express');
const router = express.Router();
const order = require('../api/order');
const Order = require('../models/order');
const Cart = require('../models/cart');

router.post('/addOrder', order.addOrder(Order, Cart));

module.exports = router;