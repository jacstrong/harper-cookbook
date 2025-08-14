export default defineNitroPlugin(async (nitroApp) => {
  console.log('defining environment variable check plugin');

  // check if environment variable is set
  const mongoUrl = process.env.MONGO_URL
  if (!mongoUrl) {
    throw new Error('MONGO_URL environment variable is not set, please set it to connect to MongoDB')
  }

  const secret = process.env.SECRET
  if (secret === undefined || secret === '') {
    throw new Error('SECRET environment variable is not set, some features may not work')
  }

})
