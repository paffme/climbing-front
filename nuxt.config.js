const axios = require('axios')

module.exports = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  server: {
    port: 8002
  },
  generate: {
    routes: async () => {
      const BASE_URL = 'https://paffme.hdaroit.fr/api/v1'

      const axiosResponse = await axios.get(
        BASE_URL + '/competitions?page=1&perPage=30'
      )
      const routesToGenerate = []
      if (!axiosResponse.data && !Array.isArray(axiosResponse.data)) {
        throw new Error('Data is invalid')
      }

      axiosResponse.data.forEach((competition) => {
        routesToGenerate.push('/competitions/' + competition.id)
        for (let i = 0; i < 10; i++) {
          routesToGenerate.push(
            '/competitions/' + competition.id + '/rank/' + i
          )
          routesToGenerate.push(
            '/competitions/' + competition.id + '/rank/groups/' + i
          )
          routesToGenerate.push(
            '/competitions/' + competition.id + '/rank/rounds' + i
          )
        }
        routesToGenerate.push('/competitions/edit/' + competition.id)
        routesToGenerate.push(
          '/competitions/edit/' + competition.id + '/images'
        )
      })

      return routesToGenerate
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.scss', '@/assets/css/bulma_customize.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/google-map.ts'],
  pwa: {
    manifest: {
      name: 'PAFFME-App',
      lang: 'fr'
    },
    workbox: {
      cacheNames: {
        prefix: 'paff-me',
        suffix: 'v1'
      },
      config: {
        debug: false
      },
      skipWaiting: true,
      cacheAssets: true
    }
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: [/^vue2-google-maps($|\/)/]
  }
}
