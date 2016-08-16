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

let company      = mongoose.model('company');
let department   = mongoose.model('department');
let customer     = mongoose.model('customer');
let user         = mongoose.model('user');
let task         = mongoose.model('task');
let notification = mongoose.model('notification');
let history      = mongoose.model('history');
let email        = mongoose.model('email');

class Scenario extends AbstractScenario {

  constructor() {
    super();
  }

  company(name) {
    return this._createObject(company, { name });
  }

  customer(name, regime, company) {
    let params = { name, regime, company: company._id };
    return this._createObject(customer, params);
  }

  customers(company, ...names) {
    for (let name of names) {
      this.customer(name, 'regime', company);
    }
  }

  department(name, company) {
    let params = { name, company: company._id };
    return this._createObject(department, params);
  }

  departments(company, ...names) {
    for (let name of names) {
      this.department(name, company);
    }
  }

  _user(name, company, role, departments) {
    let params = {
      name, email: `${name}@${company.name}.com`.toLowerCase(),
      password: bcrypt.hashSync(name),
      departments,
      role,
      company: company._id
    };

    return this._createObject(user, params);
  }

  user(name, company, ...departments) {
    return this._user(name, company, 'ROLE_USER', departments);
  }

  users(company, department, ...names) {
    for (let name of names) {
      this.user(name, company, department);
    }
  }

  manager(name, company, ...departments) {
    return this._user(name, company, 'ROLE_MANAGER', departments);
  }

  admin(name, company, ...departments) {
    return this._user(name, company, 'ROLE_ADMIN', departments);
  }

  task(name, type, customer, owner) {
    let params = {
      name,
      type,
      customer: customer._id,
      regime: customer.regime,
      owner: owner._id,
      department: owner.departments[0],
      company: owner.company
    };
    return this._createObject(task, params);
  }

  notification(type, user, options) {

    let params = {
      company : user.company.id,
      type,
      user : user._id,
    };

    let merge = Object.assign({}, params, options);
    return this._createObject(notification, merge);
  }

  history(task) {
    return this._createObject(history, { task : task._id });
  }

  email(messageId, history) {
    return this._createObject(email, { messageId, history : history._id });
  }
}

module.exports = Scenario;