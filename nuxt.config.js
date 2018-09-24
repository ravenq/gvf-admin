module.exports = {
  router: {
    middleware: 'auth'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'gvf-admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'admin for gv project.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  plugins: [
    '~/plugins/element-ui',
    '~/plugins/tools', {
      src: '~/plugins/markdown-it-vue',
      ssr: false
    }
  ],
  build: {
    vendor: [
      'axios',
      '~/plugins/element-ui'
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
