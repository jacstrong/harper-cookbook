const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const UserSchema = mongoose.model('UserSchema');

passport.use('dispatch-local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  UserSchema.findOne({ email: email, active: true })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { message: 'email or password are invalid'} });
      }
      return done(null, user);
    }).catch(done);
}));
