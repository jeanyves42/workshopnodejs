const User = require('../../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const LocalStrategy = require('passport-local').Strategy;

const localStrategy = new LocalStrategy({
    usernameField: 'email'
  },
  function(email, password, done) {
      User.findOne({
        email: email
      }, function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, {message: 'email incorrcet'});
        }
        
        bcrypt.compare(password, user.password).then(function(result) {

          if(result) return done(null, user);

          else return done(null, false, {message: 'password incorrcet'});

        });

        // if (user.password != password) {
          // return done(null, false, {message: 'password incorrcet'})
        // }

        // return done(null, user);
      });
  }
);

module.exports = localStrategy;