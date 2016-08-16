'use strict';

// #######################################
// NPM MODULES
// #######################################

let express   = require('express'),
  nconf       = require('nconf'),
  consign     = require('consign'),
  bodyParser  = require('body-parser');

// #######################################
// CONFIG INIT
// #######################################

const LOGGER = require('./logger.js');

let properties = process.env.PROPERTIES || './config/env/dev.json';
LOGGER.info(properties);

nconf
  .argv()
  .env({separator:'__'})
  .file(properties);

let secret = nconf.get('jwt:secret');

// #######################################
// LOCAL MODULES
// #######################################

let pageSort = require('./middleware/page-sort.js');
require('./mongo.js');

const APP = require('./const.js');

// #######################################
// INIT
// #######################################

let app = express();

if (process.env.NODE_ENV === APP.QA || process.env.NODE_ENV === APP.PROD) {
  require('newrelic');
  app.use(LOGGER.morgan);
}

app.set('secret', secret);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(pageSort);

consign({ cwd: 'app' })
  .then('model')
  .then('middleware/auth.js')
  .then('api')
  .exclude('api/validation')
  .exclude('api/role-filter')
  .into(app);

// this module use model inside, so before use, model must be initalized
require('./passport.js')(secret);

app.disable('x-powered-by');

module.exports = app;