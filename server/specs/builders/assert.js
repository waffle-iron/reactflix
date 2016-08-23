'use strict';

// #######################################
// NPM MODULES
// #######################################

let chai     = require('chai'),
    jsonpath = require('JSONPath');

let assert = chai.assert;
let expect = chai.expect;

// #######################################
// INIT
// #######################################

class JsonAssert {

  constructor(docs, opts) {
    this.docs = docs;
    this.opts = Object.assign({}, opts, { flatten : true });
  }

  equals(path, obj) {
    let result = JSON.stringify(jsonpath(this.opts, path, this.docs));
    assert.equal(result, JSON.stringify(obj));
    return this;
  }

  arrayIsNotEmpty(path) {
    let result = jsonpath(this.opts, path, this.docs);
    expect(result).to.have.length.abovcde(1);
    return this;
  }
}

module.exports = JsonAssert;