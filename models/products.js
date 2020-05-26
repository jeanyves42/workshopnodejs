let fs = require('fs');
let path = require('path');
let mongoose = require('mongoose');
let __connection = require('../config/connexion').connection;

__connection();

// __mongoose.connect('mongodb://localhost:27017/ebooks', {useNewUrlParser: true});

var ProductSchema = new mongoose.Schema({
  'name': String,
  'description': String,
  'USD_price': Number,
  'EUR_price': Number,
  'file_link': String,
  'creation_date': Date,
  'orders_counter': Number
});
var Product = mongoose.model('Product', ProductSchema, 'product');

// var readline = require('readline')
// var process = require('process')

// var rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false})

// rl.on('line', function(line) {

//   if(line.includes('i want product ')) {
//     var params = line.split('i want product '); 
//     orderProductById(params[1]);
//   } else {
//     console.log('Mauvaise saisie. Vous devez saisir "i want product <id_product>"');
//   }

// })
// orderProductById("P1");

const getAllProducts = function (cb) {

  // Récupération des données en BDD
  Product.find({}, cb);

  // Récupération données d'après un fichier JSON
  // fs.readFile(path.join(__dirname,'products.json'), 'utf8', (err, content) => {
  //   if(err) {
  //     return cb(err);
  //   }
  //   try {
  //     var products = JSON.parse(content);
  //     // if(products.length > 0) {
  //     //   console.log("Bienvenue. Voici les produits disponibles :");
    
  //     //   products.forEach(product => {
  //     //     console.log('- ' + product.id + ' - ' + product.name + ' / ' + product.EUR_price/100 + ' / ' + product.orders_counter);
  //     //   });
  //     // }
  //     return cb(null, products);
  //   } catch(e) {
  //     return cb(e);
  //   }
  
  // })

}


const orderProductById = function(id, cb) {

  // console.log(id, "ID MODELS ORDER");

  getAllProducts((err, products) => {
    if(err) {
      console.log(err,'Erreur');
      return cb(err);
    }

    Product.findByIdAndUpdate(id, {$inc: {orders_counter: 1}}, {new: true}, (err, product) => {
      // product.orders_counter++;
      // product.updateOne(product, (err, cb) => {
        if(err) {
          console.log('Erreur d\'enregistrement ajout produit');
          return cb(err); 
        }

        console.log(product, 'PRODUIT UPDATED');
        return cb(null, product.file_link);
      // })
    })

    // // Par JSON
    // var link = '';

    // products.forEach(product => {
    //   if(product.id === id) {
    //     product.orders_counter += 1;
    //     link = product.file_link;
    //   }
    // })

    // if(!link) {
    //   let error = new Error('Pas de produit avec cette ID');
    //   return cb(error);
    // }


    // fs.writeFile(path.join(__dirname,'products.json'), JSON.stringify(products,null,4), 'utf8', (err) => {
    //   if(err) {
    //     console.log(err);
    //     return cb(err);
    //   }

    //   console.log("Commande terminée. Voici votre fichier : " + link);

    //   return cb(null, link);

    // })
    

  })

}

module.exports = {
  getAllProducts, 
  orderProductById
};