const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
  name: { type: String, required: [true, 'Tag already exists.'], unique: true }
})

module.exports = mongoose.model('TagSchema', TagSchema);
