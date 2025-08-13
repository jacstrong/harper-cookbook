export default defineEventHandler(async (event) => {
  console.log('got some recepies')
  return { hello: 'API' }
})
