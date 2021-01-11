/*
  /api/users
*/

const router = require('express').Router();
const mongoose = require('mongoose');
const auth = require('../plugins/auth');
// const email = require('../plugins/email');
const UserSchema = mongoose.model('UserSchema');

router.get('/allusers', auth.optional, async (req, res, next) => {
  const users = await UserSchema.find({ active: true }, { 'name': 1, '_id': 0 }).exec()
  res.json(users)
})

module.exports = router;
