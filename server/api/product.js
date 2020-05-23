var multer  = require('multer')
const crypto = require('crypto')
var fs = require('fs');

const api = {};

api.deleteProduct = (Product) => (req, res) => {
    for(let i=0; i<req.body.image.length; i++){
        fs.unlinkSync('D:/3k2s/Node/KP/morionkot/server/static/images/' + req.body.image[i], function(unlinkError) {
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
    Product.findOneAndDelete({_id: req.body._id}, function(err, result){
        if(err) console.log(err);
        
        console.log(result);
    });
};

api.addProduct = (product, productCategory) => (req, res) => {
    product.create({name: req.body.name, image: req.body.image, price: req.body.price,
        weight: req.body.weight, description: req.body.description}, function(err, prod){
        if(err) return console.log(err);
        // productCategory.updateOne({category_name: req.body.category}, {$push: { product_id: prod._id}}, function(err){
        //     if(err) return console.log(err);
        //     console.log("Сохранен объект product and category", productCategory);
        // })
        }
    );
};

api.upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './server/static/images')
        },
        filename: (req, file, cb) => {
            // randomBytes function will generate a random name
            let customFileName = crypto.randomBytes(18).toString('hex')
            // get file extension from original file name
            let fileExtension = file.originalname.split('.')[1]
            cb(null, customFileName + '.' + fileExtension)
        }
      })
    })

module.exports = api;