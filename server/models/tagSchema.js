
import mongoose from 'mongoose';

const TagSchema = mongoose.Schema({
  name: { type: String, required: [true, 'Tag already exists.'], unique: true }
})

export default mongoose.model('TagSchema', TagSchema);
