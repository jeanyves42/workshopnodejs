let fs = require('fs')
let path = require('path')

fs.readFile(path.join(__dirname,'products.json'), 'utf8', (err, content) => {
  if(err) {
    return console.log(err,'Erreur')
  }
  try {
    var products = JSON.parse(content).products
    // console.log(products)
  } catch(e) {
    console.log(e, 'Erreur parsing')
  }

  getAllProducts(products)
})

function getAllProducts(products) {

  console.log("Bienvenue. Voici les produits disponibles :")

  products.forEach(product => {
    console.log('- ' + product.id + ' - ' + product.name + ' / ' + product.EUR_price/100 + ' / ' + product.orders_counter)
  });

}
