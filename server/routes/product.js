const express = require('express');
const router = express.Router();
const product = require('../api/product');
const Product = require('../models/product');
const passport = require('passport');
const config = require('../config/config.json');
const ProductCategory = require('../models/productCategory')
var fs = require('fs');

router.post('/image-product', product.upload.single('file'), (req, res) => {
  res.json({ success: true, name: req.file.filename });
});

router.get('/products', product.getProducts(Product));

router.get('/category', product.getProductCategories(ProductCategory));

router.post('/delete-product', function deleteProduct(req, res, next) {
  passport.authenticate('adminStrategy', config.session, function (err, employee) {
    if (employee) {
      for (let i = 0; i < req.body.image.length; i++) {
        fs.unlinkSync('D:/diploma/morionkot/server/static/images/' + req.body.image[i], function (unlinkError) {
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
      })
    } else {
      return res.sendStatus(401);
    }
  })(req, res, next);
});

router.post('/add-product', function addProduct(req, res, next) {
  passport.authenticate('adminStrategy', config.session, function (err, employee) {
    if (employee) {
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
      })
    } else {
      return res.sendStatus(401);
    }
  })(req, res, next);
});

router.post('/delete-image', function deleteImage(req, res, next) {
  passport.authenticate('adminStrategy', config.session, function (err, employee) {
    if (employee) {
      fs.unlinkSync('D:/diploma/morionkot/server/static/images/' + req.body.imageName, function (unlinkError) {
        if (unlinkError) {
          console.log(unlinkError);
          if (unlinkError.code === 'ENOENT') {
            // NO NEED TO RETURN ERROR IN THIS CASE
            return resolve();
          }
          reject({
            message: 'Error occurred while deleting old profile picture'
          });
        } else { resolve(); }
      });
      Product.updateOne({ _id: req.body.id }, { $pull: { image: req.body.imageName } }, function (err) {
        if (err) return console.log(err);
        else {
          res.sendStatus(200)
          console.log("Удалена картинка");
        }
      })
    } else {
      return res.sendStatus(401);
    }
  })(req, res, next);
});

router.post('/change-product', function changeProduct(req, res, next) {
  passport.authenticate('adminStrategy', config.session, function (err, employee) {
    if (employee) {
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
      })
    } else {
      return res.sendStatus(401);
    }
  })(req, res, next);
});

router.post('/product-from-category', product.getProductsFromCategory(ProductCategory));

router.post('/new-category', function newCategory(req, res, next) {
  passport.authenticate('adminStrategy', config.session, function (err, employee) {
    if (employee) {
      ProductCategory.create({ category_name: req.body.categoryName }, function (err) {
        if (err) return console.log(err);
        else res.sendStatus(200);
      })
    } else {
      return res.sendStatus(401);
    }
  })(req, res, next);
});

router.post('/delete-category', function deleteCategory(req, res, next) {
  passport.authenticate('adminStrategy', config.session, function (err, employee) {
    if (employee) {
      ProductCategory.findOneAndDelete({ _id: req.body._id }, function (err) {
        if (err) return console.log(err);
        else res.sendStatus(200);
      })
    } else {
      return res.sendStatus(401);
    }
  })(req, res, next);
});

module.exports = router;