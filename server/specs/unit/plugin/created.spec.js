'use strict';

// #######################################
// SPECS MODULES
// #######################################

let chai = require('chai');
let expect = chai.expect;

// #######################################
// NPM MODULES
// #######################################

let mongoose = require('mongoose');
let Model = mongoose.model('user');

// #######################################
// LOCAL MODULES
// #######################################

let Scenario = require('../../builders/builder.js');

describe('Plugin', () => {

  beforeEach((done) => {
    Scenario.clearDB().then(done);
  });

  it('Create field created at dynamic', () => {

    let user = Model({
      name     : 'Lucas',
      password : '12345',
      email    : 'lucas.gmmartins@gmail.com',
      role     : ['ROLE_USER'],
      company  : mongoose.Types.ObjectId(),
      departments : [mongoose.Types.ObjectId()]
    });

    return user.save()
      .then((user) => {
        expect(user.created_at).to.exist;
      });
  });
});
