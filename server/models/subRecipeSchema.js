const mongoose = require('mongoose');

const SubRecipeSchema = mongoose.Schema({
  name: { type: String, required: [true, 'You must provide a name.'], index: true},
  ingredients: [{
    ingredient: {
      type: String,
      required: true
    },
    type: { type: String, },
    amount: { type: String }
  }],
  directions: [{
    text: {type: String, required: [true, 'Please provide directions']}
  }],
})

module.exports = mongoose.model('SubRecipeSchema', SubRecipeSchema);
