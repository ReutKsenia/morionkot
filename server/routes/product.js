const express = require('express');
const router = express.Router();

const Product = require('../models/product');

router.get('/products', (req, res) => {
    Product.find({}, (err, products) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send({ products: products })
      }
    });
  })

module.exports = router;