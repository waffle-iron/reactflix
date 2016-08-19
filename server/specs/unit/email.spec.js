'use strict';

//Enable SDK with Q
let AWS = require('aws-sdk');
require(`../../config/aws.js`);

// #######################################
// SPECS MODULES
// #######################################

let chai = require('chai');
let expect = chai.expect;
chai.should();

let AWSMock  = require('aws-sdk-mock'),
    mongoose = require('mongoose'),
    Scenario = require('../builders/builder.js');

// #######################################
// LOCAL MODULES
// #######################################

let History = mongoose.model('history'),
    Email   = mongoose.model('email');

let historyService = require('../../app/service/history.js'),
    emailService   = require(`../../app/service/email.js`),
    Message        = require(`../../app/service/message.js`),
    task_type      = require('../../app/model/task-type.js');

let HistoryType  = require('../../app/model/history.js').type,
    EmailType    = require('../../app/model/email.js').type;

// #######################################
// TESTS
// #######################################

describe('Email', () => {

  beforeEach((done) => {
    Scenario.clearDB().then(done);
  });

  it('when send e-mail must save messageId and create history log', () => {

    let scenario = new Scenario();
    let redspark = scenario.company('redspark');
    let department = scenario.department('FISCAL', redspark);
    let lucas = scenario.user('Lucas', redspark, department);
    let timeoutzero = scenario.customer('timeoutzero', 'REAL_PROFIT', redspark);
    let task = scenario.task('Geração de XPTO', task_type.SERVICE_ORDER, timeoutzero, lucas);

    AWSMock.mock('SES', 'sendEmail', { MessageId : 'bd5ab889-63ac-4d0e-aa72-60e31d3c26ad'});

    return emailService.send(new Message('Rock n roll', '<html></html>', 'lucas.gmmartins@gmail.com'), { task })
      .then(() => {
        return History.findOne({ task: task._id })
          .then((history) => {

            expect(history).to.not.be.null;
            expect(history._id).to.not.be.null;
            expect(history.task.toString()).to.equal(task._id.toString());
            expect(history.actions).to.have.length.above(0);
            expect(history.actions[0].type).to.be.equal('EMAIL');
            expect(history.actions[0].email_status).to.be.equal('SEND');
            expect(history.actions[0].created_at).to.not.be.null;

            return history;
          });
      })
      .then((history) => {
        return Email.findOne({ messageId : 'bd5ab889-63ac-4d0e-aa72-60e31d3c26ad'})
          .then((email) => {
            expect(email).to.not.be.null;
            expect(email._id).to.not.be.null;
            expect(email.history.toString()).to.equal(history._id.toString());
          });
      });
  });

  it('when receive email status must create new action at history log', () => {

    let scenario    = new Scenario();
    let redspark    = scenario.company('redspark');
    let department  = scenario.department('FISCAL', redspark);
    let lucas       = scenario.user('Lucas', redspark, department);
    let timeoutzero = scenario.customer('timeoutzero', 'REAL_PROFIT', redspark);
    let task        = scenario.task('Geração de XPTO', task_type.SERVICE_ORDER, timeoutzero, lucas);
    let history     = scenario.history(task);
    scenario.email('bd5ab889-63ac-4d0e-aa72-60e31d3c26ad', history);

    return scenario.build()
      .then(() => {
        let action = { type : HistoryType.EMAIL, email_status: EmailType.BOUNCE };
        return historyService.logByMessageId('bd5ab889-63ac-4d0e-aa72-60e31d3c26ad', action)
          .then((result) => {
            expect(result).to.not.be.null;
            expect(result._id).to.not.be.null;
            expect(result._id.toString()).to.be.equal(history._id.toString());
            expect(result.actions).to.have.length.above(0);
            expect(result.actions[0].type).to.be.equal('EMAIL');
            expect(result.actions[0].email_status).to.be.equal('BOUNCE');
            expect(result.actions[0].created_at).to.not.be.null;
          });
      });
  });
});
