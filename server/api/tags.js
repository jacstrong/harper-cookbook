/*
  /api/tags
*/

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const auth = require('../plugins/auth')

const TagSchema = mongoose.model('TagSchema')

router.get('/', async (req, res, next) => {
  const tags = await TagSchema.find().exec()
  console.log(tags)
  res.json(tags)
})

router.post('/', auth.required, async (req, res, next) => {
  const tag = new TagSchema(req.body)
  try {
    await tag.save()
  } catch (error) {
    console.log(error)
    return res.status(422).json(error)
  }
  const tags = await TagSchema.find().exec()
  res.json(tags)
})

module.exports = router;
