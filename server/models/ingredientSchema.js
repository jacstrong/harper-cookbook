
import mongoose from 'mongoose';

const IngredientSchema = mongoose.Schema({
  name: { type: String, required: [true, 'That ingredient already exists.'], unique: true }
})

export default mongoose.model('IngredientSchema', IngredientSchema);
