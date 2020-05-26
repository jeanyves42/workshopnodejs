const User = require('../models/users');

module.exports.authorize = function(req,res, next) {

  console.log(req.body.email, req.body.password, "MIDDLEWARE");

  User.login(req.body.email, req.body.password, (err, user) => {

    console.log(err, "MIDDLEWARE ERROR");

    if(err) {
      return res.sendStatus('403');
    }
    return next();
  })
  
}