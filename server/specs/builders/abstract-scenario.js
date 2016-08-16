'use strict';

// #######################################
// NPM MODULES
// #######################################

let _      = require('underscore'),
  fixtures = require('pow-mongodb-fixtures'),
  Q        = require('q');

// #######################################
// SPECS MODULES
// #######################################

let id = fixtures.createObjectId;

// #######################################
// INIT
// #######################################

class AbstractScenario {

  constructor(executePostCreate = true) {
    this.scenario = {};

    this.executePostCreate = executePostCreate;
  }

  _createObject(model, params) {

    let obj = {};

    for (let key of Object.keys(model.schema.paths)) {
      obj[key] = {};
    }

    let newObject = Object.assign({}, obj, params);
    newObject._id = id();

    for (let key of Object.keys(model.schema.paths)) {
      let value = newObject[key];
      if (!value || (_.isObject(value) && _.isEmpty(value) && !_.isDate(value))) {
        delete newObject[key];
      }
    }

    let err = model(newObject).validateSync();

    if (err) {
      throw new Error(err);
    }

    if (this.executePostCreate)
      this.postCreate(newObject);

    if (!this.scenario[model.modelName]) {
      this.scenario[model.modelName] = [];
    }

    this.scenario[model.modelName].push(newObject);
    return newObject;
  }

  postCreate() {
    // must override
  }

  build() {
    let callback = (resolve) => {
      fixtures.load(this.scenario, (err) => {
        if (err)
          throw new Error(err);
        else
          resolve(this.scenario);
      });

    };

    return Q.promise(callback.bind(this));
  }

  static clearDB() {
    let callback = (resolve) => {
      fixtures.clear((err) => {
        if (err)
          throw new Error(err);
        else
          resolve();
      });
    };

    return Q.promise(callback.bind(this));
  }
}

// class Builder {

//   constructor (model, id) {
//     this.model = model;
//     this.id    = id;
//   }

//   get get(){
//     return this.model.find({ _id : this.id});
//   }

// }

module.exports = (db, options) => {
  fixtures = fixtures.connect(db, options);
  return AbstractScenario;
};