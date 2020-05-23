const mongoose = require('mongoose');

const IngredientSchema = mongoose.Schema({
  name: { type: String, required: [true, 'That ingredient already exists.'], unique: true }
})

module.exports = mongoose.model('IngredientSchema', IngredientSchema);
