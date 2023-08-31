// first import the 3rd party Cypress plugins
import 'cypress-data-session'
import 'cypress-map'
// @ts-ignore
chai.use(require('chai-sorted'))
// @ts-ignore
require('cypress-watch-and-reload/support')
import './commands'
