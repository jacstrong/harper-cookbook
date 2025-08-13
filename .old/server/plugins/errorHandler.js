
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('error', (error) => {
    console.error('An error occurred:', error);
  });
});
