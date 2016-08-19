'use strict';

// #######################################
// NPM MODULES
// #######################################

let nconf = require('nconf');

// #######################################
// LOCAL MODULES
// #######################################

let app = require('./config/express.js');

// #######################################
// INIT
// #######################################

const LOGGER = require('./config/logger.js');

app.listen(nconf.get('app:port'), () => {
  LOGGER.info(`[application] has been started at port: [${APP_PORT}]`);
});