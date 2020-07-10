/*
  /api/recipe
*/

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const auth = require('../plugins/auth')

const RecipeSchema = mongoose.model('RecipeSchema')

router.get('/', async (req, res, next) => {
  const recipes = await RecipeSchema.find().exec()
  // console.log(recipes)
  res.json(recipes)
})

router.get('/search', async (req, res, next) => {
  if (!req.query.search) return res.json([])
  let search = new RegExp(req.query.search, 'i')
  const recipes = await RecipeSchema.find({
    $or:[
      {name: search},
      {by: search}
    ]
  }, 'name by', { limit: 10})
  return res.json(recipes)
})

router.get('/:id', async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({error: {message: 'Cannot find that recipe'}})
  }
  const recipe = await RecipeSchema.findById(req.params.id).exec()
  if (recipe === null) return res.status(404).json({error: {message: 'Cannot find that recipe'}})
  res.json(recipe)
  recipe.views = recipe.views + 1
  recipe.save()
    .catch(err => {
      console.log(err)
    })
})

router.post('/', auth.required, async (req, res, next) => {
  const recipe = new RecipeSchema(req.body)
  recipe.submitter = req.user.id
  try {
    await recipe.save()
  } catch (error) {
    console.log(error)
    return res.status(422).json(error)
  }
  return res.json(recipe)
})

router.put('/:id', async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({error: {message: 'Cannot find that recipe'}})
  }

  const recipe = await RecipeSchema.findByIdAndUpdate(req.params.id, req.body)
  return res.json(recipe)
})

module.exports = router;
