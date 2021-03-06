const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
  name: { type: String, required: [true, 'You must provide a name.'], index: true},
  by: { type: String, required: [true, 'You must say who made this recipe']},
  ingredients: [{
    ingredient: {
      type: String,
      required: true
    },
    type: { type: String, },
    amount: { type: String }
  }],
  version: { type: String, enum: ['original', 'new'], required: [true, 'version must be set']},
  directions: [{
    text: {type: String, required: [true, 'Please provide directions']}
  }],
  notes: { type: String },
  video: { type: String },
  images: { type: String },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TagSchema'
  }],
  submitter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserSchema',
    required: [true, 'Must have an associated submitter']
  },
  subRecipe: {
    name: { type: String },
    ingredients: [{
      ingredient: {
        type: String,
      },
      type: { type: String, },
      amount: { type: String }
    }],
    directions: [{
      text: { type: String }
    }],
  },
  views: { type: Number, default: 0 }
})

module.exports = mongoose.model('RecipeSchema', RecipeSchema);
