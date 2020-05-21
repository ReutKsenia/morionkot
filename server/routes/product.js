const express = require('express');
const router = express.Router();
const product = require('../api/product');
const Product = require('../models/product');
const ProductCategory = require('../models/productCategory')

var multer  = require('multer')
var upload = multer({ dest: './server/static/images' })


router.post('/image-product', upload.single('file'), (req, res) => {
  // console.log(req.body);
  console.log(req.file);
  res.json({ success: true, name: req.file.filename });
});

router.get('/products', (req, res) => {
    Product.find({}, (err, products) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send({ products: products })
      }
    });
  });

  router.get('/category', (req, res) => {
    ProductCategory.find({}, (err, productsCategory) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send({ productsCategory: productsCategory })
      }
    });
  });

router.post('/delete-product', product.deleteProduct(Product));

router.post('/add-product', product.addProduct(Product, ProductCategory));

module.exports = router;