var multer  = require('multer')
const crypto = require('crypto')
var fs = require('fs');

const api = {};

api.upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './server/static/images')
        },
        filename: (req, file, cb) => {
            // гунерируем рандомное имя
            let customFileName = crypto.randomBytes(18).toString('hex')
            let fileExtension = file.originalname.split('.')[1]
            cb(null, customFileName + '.' + fileExtension)
        }
      })
    })

    api.getProducts = (Product) => (req, res) => {
        Product.find({}, (err, products) => {
            if (err) {
              res.sendStatus(500)
            } else {
              res.send({ products: products })
            }
          });
    }

    api.getProductCategories = (ProductCategory) => (req, res) => {
        ProductCategory.find({}, (err, productsCategory) => {
            if (err) {
              res.sendStatus(500)
            } else {
              res.send({ productsCategory: productsCategory })
            }
          });
    }

    api.getProductsFromCategory = (ProductCategory) => (req, res) => {
        ProductCategory.findOne({ category_name: req.body.categoryName }).populate('product_id').exec(function (err, post) {
            if (err) {
              res.sendStatus(500)
            }
            else {
              res.send({ products: post.product_id });
            }
          })
    }
module.exports = api;