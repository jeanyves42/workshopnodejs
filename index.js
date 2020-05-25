let fs = require('fs');
let path = require('path');

orderProductById("P1");

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

