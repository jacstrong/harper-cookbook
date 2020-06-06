const colors = require('vuetify/es5/util/colors').default

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - The Harper Cookbook',
    title: 'The Harper Cookbook',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: `Adapted from the original printing of The Harper Family Cookbook, we have digitized all of your favorite recepies. You can now easily search for the recipe you are looking for by name, type, or by who originally shared it. We have also now made it possible to share new recipes so the tradition can carry on!'` },
      { name: 'keywords', content: 'cookbook, harper, harper cookbook, harper family cookbook, the harper family, the harper family cookbook, family cookbook, the family cookbook, recipes'},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/quill', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShaking: true,
    theme: {
      themes: {
        light: {
          primary: colors.green.darken4,
          accent: colors.lightGreen.darken3, //light-green darken-3
          secondary: colors.lime.darken3,
          info: colors.amber.lighten2,
          warning: colors.orange.accent4,
          error: colors.deepOrange.accent2,
          success: colors.green.accent3
        }
      }
    }
  },
  server: {
    port: process.env.PORT || 3000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
