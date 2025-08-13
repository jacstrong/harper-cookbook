/*
  /api/tags
*/


import express from 'express'
import mongoose from 'mongoose'
import auth from '../plugins/auth'

const router = express.Router()
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

export default router;
