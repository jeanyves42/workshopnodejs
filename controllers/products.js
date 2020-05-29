const __Products = require('../models/products');

// let __getAllProducts = require('../models/products').getAllProducts;

module.exports.getAllProducts = function(req, res) {

  __Products.getAllProducts((err, products) => {

    console.log('GET ALL PRODUCTS');

    if(err) {
      console.log(err);
      return res.sendStatus(500);
    }

    return res.render('products', {products})
  })

}

module.exports.addProduct = function(req, res) {

  // console.log(req.params.id, "PARAMS ID");
  console.log(req.user, "USER CONNECTED");

  if(!req.body.id) return res.send({"status": false, "product": null});

  __Products.orderProductById(req.body.id, (err, link) => {
    if(err) {
      console.log(err);
      return res.sendStatus(500);
    }
    return res.send({"status": true, "product": link});
  })

}