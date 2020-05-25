let fs = require('fs');
let path = require('path');

getAllProducts();

function getAllProducts() {

  fs.readFile(path.join(__dirname,'products.json'), 'utf8', (err, content) => {
    if(err) {
      return console.log(err,'Erreur');
    }
    try {
      var products = JSON.parse(content).products;
      if(products.length > 0) {
        console.log("Bienvenue. Voici les produits disponibles :");
    
        products.forEach(product => {
          console.log('- ' + product.id + ' - ' + product.name + ' / ' + product.EUR_price/100 + ' / ' + product.orders_counter);
        });
      }
      // console.log(products)
    } catch(e) {
      console.log(e, 'Erreur parsing');
    }
  
  })

}
