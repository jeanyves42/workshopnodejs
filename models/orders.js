let mongoose = require('mongoose');
let __connection = require('../config/connexion').connection;

__connection();

// __mongoose.connect('mongodb://localhost:27017/ebooks', {useNewUrlParser: true});

var OrderSchema = new mongoose.Schema({

  'product': {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
  'user': {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  'order_date': {type: Date, default: new Date()},
  'price': Number
  
});

var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;