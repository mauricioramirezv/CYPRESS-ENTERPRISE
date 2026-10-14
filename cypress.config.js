const { defineConfig } = require('cypress')

module.exports = defineConfig({

  reporter: 'mochawesome',

  reporterOptions: {
    reportDir: 'mochawesome-report',
    overwrite: false,
    html: true,
    json: true
  },

  e2e: {
    baseUrl: 'http://127.0.0.1:5173',
    experimentalStudio: true
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite'
    }
  }
})
