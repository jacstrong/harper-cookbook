const express = require('express')
const consola = require('consola')
const mongoose = require('mongoose')
import { v1 as uuidv1 } from 'uuid';
const cookieParser = require('cookie-parser')
const { Nuxt, Builder } = require('nuxt')
const app = express()


const auth = require('./plugins/auth')

const isProduction = process.env.NODE_ENV === 'production';

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

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
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    process.env.SECRET = uuidv1()
  } else {
    mongoose.connect('mongodb://localhost:27017/harper-cookbook', { useNewUrlParser: true })
  }

  //Register DB Schemas
  require('./models/ingredientSchema')
  require('./models/recipeSchema')
  require('./models/tagSchema')
  require('./models/userSchema')

  app.use(express.json())
  app.use(cookieParser())
  app.use(auth.optional)
  require('./middleware/passport')

  // Register API
  app.use('/api', require('./api'))

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
start()
