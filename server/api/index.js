/*
  /api
*/

const express = require('express')
const router = express.Router()
const logger = require('morgan')

router.use(logger('tiny'))

router.get('/', (req, res, next) => {
  res.status(200).send(`Welcome to the Harper Cookbook API. We're glad you're here! If you find this please reach out to me if you have questions ja.ha.strong@gmail.com`)
})

router.use('/recipe', require('./recipe'))
router.use('/user', require('./user'))
router.use('/tags', require('./tags'))
router.use('/users', require('./users'))

module.exports = router;
