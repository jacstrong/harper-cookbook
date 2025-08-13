
import express from 'express';
import consola from 'consola';
import mongoose from 'mongoose';
import { v1 as uuidv1 } from 'uuid';
import cookieParser from 'cookie-parser';
import { Nuxt, Builder } from 'nuxt';
import auth from './plugins/auth.js';
import config from '../nuxt.config.js';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
config.dev = process.env.NODE_ENV !== 'production';

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }


  if (isProduction) {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
    process.env.SECRET = uuidv1();
    console.log(`Using MONGO_URL: ${process.env.MONGO_URL}`);
  } else {
    await mongoose.connect('mongodb://localhost:27017/harper-cookbook', { useNewUrlParser: true });
    console.log('Using local MongoDB');
  }

  // Register DB Schemas (side-effect imports)
  await import('./models/ingredientSchema.js');
  await import('./models/recipeSchema.js');
  await import('./models/tagSchema.js');
  await import('./models/userSchema.js');

  app.use(express.json());
  app.use(cookieParser());
  app.use(auth.optional);
  await import('./middleware/passport.js');

  // Register API
  const apiRouter = (await import('./api/index.js')).default;
  app.use('/api', apiRouter);

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Connect to Database

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
console.log('starting server...')
start()
