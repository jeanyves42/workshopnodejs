let path = require('path');
const express = require('express');
var bodyParser = require('body-parser');

const app = express();
const port = 3000;

var __Products = require('./controllers/products');
var __Authorize = require('./middlewares/authorize').authorize;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/', __Products.getAllProducts);
app.post('/product/add', __Authorize,  __Products.addProduct);

app.listen(port, () => console.log(`App listening on port ${port} !`));