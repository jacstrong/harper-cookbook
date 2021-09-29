const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
//// Nodemailer Stuff, Rip me out!
// TOTO
const nodemailer = require('nodemailer');

const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'ja.ha.strong@gmail.com',
      pass: process.env.GMAIL_PASS
  }
});


const UserSchema = mongoose.Schema({
  active: { type: Boolean, required: true, default: false},
  created: { type: Date, required: true, default: new Date },
  email: { type: String, required: [true, 'You must provide an email.'], unique: true },
  hash: { type: String, required: true },
  lastLogin: { type: Date, required: true, default: new Date() },
  name: { type: String, required: true },
  relation: { type: String },
  salt: { type: String, required: true },
  role: { type: String, required: true, default: 'user', enum: ['user', 'admin', 'superadmin']},
  reset_uuid: { type: String, required: false }
})

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

UserSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
}

UserSchema.methods.generateJWT = function () {

  this.lastLogin = new Date();

  return jwt.sign({
    email: this.email,
    name: this.name,
    id: this._id,
    role: this.role
  }, process.env.NODE_ENV === 'development' ? 'secret' : process.env.SECRET, { expiresIn: '3d' }); // TODO: Set Secret
}

UserSchema.methods.toAuthJSON = function () {
  return {
    id: this._id,
    email: this.email,
    token: this.generateJWT()
  };
}

UserSchema.methods.passwordResetRequest = function () {
  this.reset_uuid = uuidv4();

  // This line runs async
  this.save();

  let mailDetails = {
    from: 'ja.ha.strong@gmail.com',
    to: this.email,
    subject: 'Harper Cookbook Password Reset',
    text: `Please follow this link to reset your password: https://harpercookbook.com/reset-password/${this.reset_uuid}`
  };

  mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
      console.log(process.env.GMAIL_PASS)
      console.log(err)
      console.log('Error Occurs');
    } else {
      console.log('Reset email sent successfully');
    }
  });
}


module.exports = mongoose.model('UserSchema', UserSchema);
