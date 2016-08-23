'use strict';

// #######################################
// NPM MODULES
// #######################################

let mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs');

// #######################################
// SPECS MODULES
// #######################################

let { DATABASE, HOST } = require('../../config/const.js');
let AbstractScenario   = require('./abstract-scenario.js')(DATABASE, { host: HOST });

// #######################################
// LOCAL MODULES
// #######################################

// let company      = mongoose.model('company');
// let department   = mongoose.model('department');
// let customer     = mongoose.model('customer');
// let user         = mongoose.model('user');
// let task         = mongoose.model('task');
// let notification = mongoose.model('notification');
// let history      = mongoose.model('history');
// let email        = mongoose.model('email');

class Scenario extends AbstractScenario {

  constructor() {
    super();
  }


}

module.exports = Scenario;