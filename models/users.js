let mongoose = require('mongoose');
let __connection = require('../config/connexion').connection;

__connection();

// __mongoose.connect('mongodb://localhost:27017/ebooks', {useNewUrlParser: true});

var UserSchema = new mongoose.Schema({
  'email': String,
  'password': String
});
var User = mongoose.model('User', UserSchema);

// const login = function(email, password, cb) {
//   User.findOne({email: email, password: password}, (err, user) => {
//     if(err || !user) {
//       console.log('Pas de user');
//       return cb(err || new Error('pas de user'));
//     }
//     console.log(user, "USER FINDONE");
//     return cb(null, user);
//   })
// }

// module.exports = {
//   login
// };

module.exports = User;