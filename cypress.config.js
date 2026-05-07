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
    baseUrl: 'http://localhost:5173',
    experimentalStudio: true
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite'
    }
  }
})
