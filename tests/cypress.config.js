const { defineConfig } = require("cypress");
const { Pool } = require('pg')

require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1440,
    viewportHeight: 900,
    setupNodeEvents(on, config) {
        const pool = new Pool({
          host: process.env.HOST,
          user: process.env.USER,
          password: process.env.PASSWORD,
          database: process.env.DATABASE,
          port: 5432
      })

      on('task', {
        removeUser(email) {
            return new Promise(function(resolve) {
                pool.query('DELETE FROM public.users WHERE email = $1', [email], function(error, result) {
                    if (error) {
                        throw error
                    }
                    resolve({ success: result })
                })
            })
        }
      })
    },
  },
});
