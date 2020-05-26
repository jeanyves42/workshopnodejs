let __mongoose = require('mongoose');

module.exports.connection = function() {
  __mongoose.connect('mongodb://localhost:27017/mynewbdd', {useNewUrlParser: true});
  __mongoose.connection.on('connected', () => {
    console.log('CONNEXION REUSSIE');
  })
  __mongoose.connection.on('error', (err) => {
    console.log(err, 'CONNEXION FAILED');
  })
}