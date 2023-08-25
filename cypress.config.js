const { defineConfig } = require('cypress')
const registerDataSession = require('cypress-data-session/src/plugin')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    supportFile: 'cypress/support/e2e.ts',
    env: {
      users: {
        standard: {
          username: 'standard_user',
          password: 'secret_sauce',
        },
        lockedOut: {
          username: 'locked_out_user',
          password: 'secret_sauce',
        },
        problem: {
          username: 'problem_user',
          password: 'secret_sauce',
        },
        glitch: {
          username: 'performance_glitch_user',
          password: 'secret_sauce',
        },
      },
    },
    setupNodeEvents(on, config) {
      registerDataSession(on, config)
      return config
    },
  },
})
