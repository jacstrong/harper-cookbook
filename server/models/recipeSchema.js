const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const RecipeSchema = mongoose.Schema({
  name: { type: String, required: [true, 'You must provide a name.'], unique: true },
  by: { type: String, required: [true, 'You must say who made this recipe']},
  ingredients: [{
    ingredientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'IngredientSchema',
      required: true
    },
    type: {
      type: String,
      enum: ['cups', 'gallon', 'quart', 'pint', 'oz', 'tbsp', 'tsp', 'ml'],
      required: true,
    },
    amount: { type: String, required: true }
  }],
  version: { type: String, enum: ['original', 'new'], required: [true, 'version must be set']},
  directions: { type: String, required: [true, 'Please provide directions'] },
  video: { type: String },
  images: { type: String },
  tags: [{
    tagID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TagSchema'
    }
  }]
})

module.exports = mongoose.model('RecipeSchema', RecipeSchema);
