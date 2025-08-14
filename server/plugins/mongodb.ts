import mongoose from 'mongoose';

export default defineNitroPlugin(async (nitroApp) => {
  console.log('defining MongoDB plugin')

  const mongoUrl = process.env.MONGO_URL as string;

  await mongoose.connect(mongoUrl);
  console.log(`Using MONGO_URL: ${mongoUrl}`);

  // Register DB Schemas (side-effect imports)
  await import('../models/ingredientSchema.js');
  await import('../models/recipeSchema.js');
  await import('../models/tagSchema.js');
  await import('../models/userSchema.js');
})
