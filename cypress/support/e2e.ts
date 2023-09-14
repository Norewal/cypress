// first import the 3rd party Cypress plugins
// https://github.com/bahmutov/cypress-code-coverage
import '@bahmutov/cypress-code-coverage/support'
import 'cypress-data-session'
import 'cypress-map'
// @ts-ignore
require('ramda')
// @ts-ignore
chai.use(require('chai-sorted'))
// @ts-ignore
require('cypress-watch-and-reload/support')
import './commands'

import * as R from 'ramda'
