let fs = require('fs');
let path = require('path');
var readline = require('readline')
var process = require('process')

var rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false})

rl.on('line', function(line) {

  if(line.includes('i want product ')) {
    var params = line.split('i want product '); 
    orderProductById(params[1]);
  } else {
    console.log('Mauvaise saisie. Vous devez saisir "i want product <id_product>"');
  }

})
// orderProductById("P1");

function getAllProducts(cb) {

  fs.readFile(path.join(__dirname,'products.json'), 'utf8', (err, content) => {
    if(err) {
      return cb(err);
    }
    try {
      var products = JSON.parse(content);
      if(products.length > 0) {
        console.log("Bienvenue. Voici les produits disponibles :");
    
        products.forEach(product => {
          console.log('- ' + product.id + ' - ' + product.name + ' / ' + product.EUR_price/100 + ' / ' + product.orders_counter);
        });
      }
      return cb(null, products);
    } catch(e) {
      return cb(e);
    }
  
  })

}


function orderProductById(id) {

  getAllProducts((err, products) => {
    if(err) {
      return console.log(err,'Erreur');
    }

    var link = '';

    products.forEach(product => {
      if(product.id === id) {
        product.orders_counter += 1;
        link = product.file_link;
      }

    })

    fs.writeFile(path.join(__dirname,'products.json'), JSON.stringify(products,null,4), 'utf8', (err) => {
      if(err) {
        return console.log(err);
      }

      console.log("Commande terminée. Voici votre fichier : " + link);

    })

  })

}

