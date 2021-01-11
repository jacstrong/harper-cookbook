/*
  /api/user
*/

const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');
const auth = require('../plugins/auth');
// const email = require('../plugins/email');
const jwt = require('jsonwebtoken')
const UserSchema = mongoose.model('UserSchema');

// router.use('/emailconfirmation', require('./emailConfirmation'));
// router.use('/password', require('./password'));

router.post('/'/* , auth.optional */, (req, res, next) => {
  console.log(req.body)
  if (!req.body.password && req.body.password.length < 8) {
    return res.status(422).json({
      error: {
        message: 'Password is required and must be at least 10 characters.',
      },
    });
  }

  const user = UserSchema(req.body)
  user.setPassword(req.body.password)
  return user.save()
    .then(doc => {
      console.log(doc)
      res.json(doc)
    })
})


router.get('/', (req, res, next) => {
  if (req.user) {
    return res.json({message: 'Token is valid', success: true }).send()
  } else {
    return res.status(401).json({message: 'Token missing or invalid', success: false }).send()
  }
});


router.post('/login', (req, res, next) => {
  const request = req.body

  return passport.authenticate('dispatch-local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return next(err)
    }

    if (passportUser) {
      const user = passportUser.toAuthJSON()
      passportUser.save()
      res.cookie('authorization', user.token, { sameSite: 'strict' })
      return res.json(user)
    }

    return res.status(401).json({ error: { message: 'email or password incorrect' }})
  })(req, res, next)
})

router.get('/logout', (req, res, next) => {
  res.clearCookie('authorization')
  return res.json({message: 'You have been logged out'})
})

router.post('/changepassword', auth.required, async (req, res, next) => {
  console.log('req.user', req.user)
  if (!req.body.password) return res.status(422).json({error: { message: 'please provide new password' }})

  const user = await UserSchema.findById(req.user.id)
  user.setPassword(req.body.password)
  user.save()
    .then(() => {
      res.json({message: 'Password has been changed'})
    })
    .catch(() => {
      res.status(500).json({error: { message: 'Something went wrong'}})
    })
})

router.get('/allusers', auth.required, async (req, res, next) => {
  if (req.user.role !== 'superadmin') return res.status(404)

  const users = await UserSchema.find({}, 'active lastLogin role name relation email').exec()
  res.json(users)
})

router.put('/adminupdate/:id', auth.required, async (req, res, next) => {
  console.log('stuff is getting realo', req.user)
  if (req.user.role !== 'superadmin') return res.status(404)

  try {
    const user = await UserSchema.findByIdAndUpdate(req.params.id, req.body).exec()
    return res.json({message: 'yo you did it'})
  } catch (error) {
    return res.status(500).json({error: { message: 'you messed something up'}})
  }
})

module.exports = router;
