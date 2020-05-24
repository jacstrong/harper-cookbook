const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const auth = require('../plugins/auth')

const RecipeSchema = mongoose.model('RecipeSchema')

router.get('/', async (req, res, next) => {
  const recipes = await RecipeSchema.find().exec()
  console.log(recipes)
  res.json(recipes)
})

router.get('/:id', async (req, res, next) => {
  const recipe = await RecipeSchema.findById(req.params.id).exec()
  if (recipe === null) return res.status(404).json({error: {message: 'Cannot find that recipe'}})
  res.json(recipe)
})

router.post('/', auth.required, async (req, res, next) => {
  const recipe = new RecipeSchema(req.body)
  try {
    await recipe.save()
  } catch (error) {
    console.log(error)
    return res.status(422).json(error)
  }
  return res.json(recipe)
})


module.exports = router;