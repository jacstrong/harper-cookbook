// import mongoose from 'mongoose';
// import passport from 'passport';
// import LocalStrategy from 'passport-local';



// const UserSchema = mongoose.model('UserSchema');

// export default passport.use('dispatch-local', new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password'
// }, (email, password, done) => {
//   userService.getUserByEmail(email)
//   // UserSchema.findOne({ email: email, active: true })
//   //   .then((user) => {
//   //     if(!user || !user.validatePassword(password)) {
//   //       return done(null, false, { errors: { message: 'email or password are invalid'} });
//   //     }
//   //     return done(null, user);
//   //   }).catch(done);
// }));

export default defineEventHandler(async (event) => {
  console.log('Passport middleware initialized');
})
