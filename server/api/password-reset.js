const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');
const auth = require('../plugins/auth');
const UserSchema = mongoose.model('UserSchema');

router.post('/', auth.optional, (req, res, next) => {
  const reqEmail = req.body.email;

  if (!reqEmail) {
    return res.status(422).json({
      error: {
        message: "email is required"
      }
    })
  }

  UserSchema.findOne({ email: reqEmail }, (err, doc) => {
    if (err) return res.status(500).send();
    if (doc === null) return res.json({ message: 'request has been sent'});

    doc.passwordResetRequest();

    return res.json({ message: 'request has been sent' })
  })
})

router.post('/forgotpassword/:id', auth.optional, (req, res, next) => {
  const id = req.params.id;
  const password = req.body.password

  if (!password) {
    return res.status(422).json({
      error: {
        message: "password"
      }
    })
  }

  PasswordConfSchema.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(500).json({ error: { message: 'invalid reset id'}}).send();
    if (doc === null) return res.status(422).json({ error: { message: 'password reset request could not be found' }});

    UserSchema.findById(doc.userID, (err, doc) => {
      if (err) return res.status(500).send();
      if (doc === null) return res.status(422).json({ error: { message: 'password reset request could not be found' }});

      doc.setPassword(password)
      doc.save()
      return res.json({message: 'password has been reset'});
    })
  })
})

module.exports = router;
