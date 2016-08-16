'use strict';

// #######################################
// NPM MODULES
// #######################################

let mongoose         = require('mongoose'),
    nconf            = require('nconf'),
    auditLog         = require('audit-log'),
    Q                = require('q'),
    mongoosePaginate = require('mongoose-paginate');

let Promisse = Q.Promise;

// #######################################
// LOCAL MODULES
// #######################################

let LOGGER = require('./logger.js'),
    pluginCreatedAt = require('./plugin/created.js');

let { MONGODB_URL, MONGODB_AUDIT_URL } = require('./const.js');

// #######################################
// INIT
// #######################################

const MONGO_OPTIONS = Object.assign({}, nconf.get('mongo:options'), { promiseLibrary: Q });

mongoose.Promise = Promisse;
mongoose.connect(MONGODB_URL, MONGO_OPTIONS);

// #######################################
// PLUGINS
// #######################################

mongoose.plugin(mongoosePaginate);
mongoose.plugin(pluginCreatedAt);

// #######################################
// INIT
// #######################################

let connect = mongoose.connection;

connect.on('connected', () => {
  LOGGER.debug('MongoDB connected!');
});

connect.on('error', (error) => {
  LOGGER.error(error);
});

connect.on('close', () => {
  LOGGER.debug('MongoDB closed!');
});

connect.on('reconnected', () => {
  LOGGER.debug('MongoDB reconnected!');
});

connect.on('disconnected', () => {
  LOGGER.debug('MongoDB disconnected!');
});

auditLog.addTransport("mongoose", { connectionString: MONGODB_AUDIT_URL });
// auditLog.addTransport("console");

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    LOGGER.info('SERVER DOWN');
    process.exit(0);
  });
});

module.exports = connect;