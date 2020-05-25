let fs = require('fs')
let path = require('path')

fs.readFile(path.join(__dirname,'products.json'), 'utf8', (err, content) => {
  console.log(content)
})