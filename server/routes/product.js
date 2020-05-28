const express = require('express');
const router = express.Router();
const product = require('../api/product');
const Product = require('../models/product');
const ProductCategory = require('../models/productCategory')
var fs = require('fs');

router.post('/image-product', product.upload.single('file'), (req, res) => {
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

router.post('/delete-product', (req, res) => {
  for (let i = 0; i < req.body.image.length; i++) {
    fs.unlinkSync('D:/3k2s/Node/KP/morionkot/server/static/images/' + req.body.image[i], function (unlinkError) {
      if (unlinkError) {
        console.log(unlinkError);
        if (unlinkError.code === 'ENOENT') {
          // NO NEED TO RETURN ERROR IN THIS CASE
          return resolve();
        }
        reject({
          message: 'Error occurred while deleting old profile picture'
        });
      } else {
        resolve();
      }
    });
  }
  console.log('картинки удалены');
  Product.findOneAndDelete({ _id: req.body._id }, function (err, result) {
    if (err) console.log(err);
    else {
      ProductCategory.updateOne({ $pull: { product_id: result._id } }, function (err) {
        if (err) return console.log(err);
        else {
          res.sendStatus(200)
          console.log("Удалён из категории");
        }
      })
    }
  });
});

router.post('/add-product', (req, res) => {
  Product.create({
    name: req.body.name, image: req.body.image, price: req.body.price,
    weight: req.body.weight, description: req.body.description
  }, (err, product) => {
    if (err) {
      res.sendStatus(500)
    } else {
      ProductCategory.updateOne({ category_name: req.body.category }, { $push: { product_id: product._id } }, function (err) {
        if (err) return console.log(err);
        else {
          res.sendStatus(200)
          console.log("Сохранен объект product and category");
        }
      })
    }
  });
});

router.post('/delete-image', (req, res) => {
  fs.unlinkSync('D:/3k2s/Node/KP/morionkot/server/static/images/' + req.body.imageName, function (unlinkError) {
    if (unlinkError) {
      console.log(unlinkError);
      if (unlinkError.code === 'ENOENT') {
        // NO NEED TO RETURN ERROR IN THIS CASE
        return resolve();
      }
      reject({
        message: 'Error occurred while deleting old profile picture'
      });
    } else {
      resolve();
    }
  });
  Product.updateOne({ _id: req.body.id }, { $pull: { image: req.body.imageName } }, function (err) {
    if (err) return console.log(err);
    else {
      res.sendStatus(200)
      console.log("Удалена картинка");
    }
  })
});

router.post('/change-product', (req, res) => {
  Product.updateOne({ _id: req.body._id }, {
    $set: {
      name: req.body.name, image: req.body.image, price: req.body.price,
      weight: req.body.weight, description: req.body.description
    }
  }, (err, product) => {
    if (err) {
      res.sendStatus(500)
    } else {
      ProductCategory.updateOne({ $pull: { product_id: product._id } }, function (err) {
        if (err) return console.log(err);
      });
      ProductCategory.updateOne({ category_name: req.body.category }, { $push: { product_id: product._id } }, function (err) {
        if (err) return console.log(err);
        else {
          res.sendStatus(200)
        }
      })
    }
  });
})

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

router.post('/new-category', (req, res) => {
  ProductCategory.create({ category_name: req.body.categoryName }, function(err) {
    if (err) return console.log(err);
    else res.sendStatus(200);
  })
});

router.post('/delete-category', (req, res) => {
  ProductCategory.findOneAndDelete({ _id: req.body._id }, function(err) {
    if (err) return console.log(err);
    else res.sendStatus(200);
  })
})

module.exports = router;