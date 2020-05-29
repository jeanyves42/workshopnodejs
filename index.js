let path = require('path');
const express = require('express');
var bodyParser = require('body-parser');
const passport = require('passport');
const __User = require('./models/users');
const localStrategy = require('./controllers/Auth/authLocal');

const session = require("express-session");

passport.use(localStrategy);

const app = express();
const port = 3000;

var __Products = require('./controllers/products');
var __Orders = require('./controllers/orders');
var __Authorize = require('./middlewares/authorize').authorize;
var __Custom = require('./middlewares/custom').custom;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.use(session({
  secret: 'jybbatiactugroupe',
  resave: false,
  saveUninitialized: false
}));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  console.log(user.id, 'ID');
  console.log(user._id, '_ID');
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  __User.findById(id, function(err, user) {
      cb(err, user);
  });
});

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('io user is connected');
  socket.emit('message', {message: 'message sent !'});
  socket.on('clientresponse', (data) => {
    console.log(data.message);
  })
});

app.get('/', __Products.getAllProducts);
// app.post('/product/add', __Authorize,  __Products.addProduct);
// app.post('/product/add', passport.authenticate('local'), __Products.addProduct);
app.post('/order', passport.authenticate('local'), __Orders.addOrder);
app.get('/myorders', __Custom, __Orders.getAllOrders);

server.listen(port, () => console.log(`App listening on port ${port} !`));