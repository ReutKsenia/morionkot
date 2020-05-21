const api = {};

api.deleteProduct = (Product) => (req, res) => {
    Product.findOneAndDelete({_id: req.body._id}, function(err, result){
        if(err) console.log(err);
        console.log(result);
    });
};

api.addProduct = (product, productCategory) => (req, res) => {
    product.create({name: req.body.name, image: req.body.image, price: req.body.price,
        weight: req.body.weight, description: req.body.description}, function(err, prod){
        if(err) return console.log(err);
        productCategory.updateOne({category_name: req.body.category}, {$push: { product_id: prod._id}}, function(err){
            if(err) return console.log(err);
            console.log("Сохранен объект product and category", productCategory);
        })
        }
    );
}

module.exports = api;