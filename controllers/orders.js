const __Orders = require('../models/orders');
const __Products = require('../models/products').Product;
const __User = require('../models/users');

module.exports.addOrder = async function(req, res) {

  if(!req.body.id) return res.send({"status": false, "order": null});

  let product = {};
  try {
    product = await __Products.findById(req.body.id);
  } catch (error) {
    return console.log(error);
  }
  

  var order = new __Orders({
    'product': product,
    'user': req.user,
    'price': product.EUR_price
  })

  order.save(function(err, order) {
    if(err) return res.sendStatus(500);
    return res.send({"status": true, "product": order.id});
  })

}

module.exports.getAllOrders = async function(req,res) {

    let orders = await __Orders
      .find({user: req.user.id})
      .populate({
        path: 'product'
      });

    return res.render('myorders', {orders: orders});
    
}