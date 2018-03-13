const LocalStrategy = require("passport-local").Strategy;
const User          = require("../models/user");
const bcrypt        = require("bcrypt");

module.exports = (passport) => {

  passport.use('local-auth', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },(email, password, next) => {
    user.findOne({ email })
      .then(user => {
        if(!user){
          next(null, user,{ password: 'invalid email or password' });
        }else{
          user.checkPasssword(password)
            .then(match => {
              if (match){
                next(null, user);
              }else{
                next(null, null, { password: 'invalid email or password' });
              }
            }).catch(error => next(error));
        }
      }).catch(error => next(error));
  }));

  passport.serializeUser((user, next) => {
    next(null, user._id);
  });

  passport.deserializeUser((id, cb) => {
    User.findById(id)
      .then(user => {
          next(null, user);
      }).catch(error => next(error));
  });

};
