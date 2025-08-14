export default defineEventHandler(async () => {
  // Handle the API request
  console.log('API request received')
  userService.getUser('12345') // Example usage of userService
  return {
    message: 'Hello from the API!'
  }
})
