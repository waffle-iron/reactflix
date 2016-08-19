'use strict';

let chai     = require('chai'),
    sinon    = require('sinon'),
    Q        = require('q'),
   //AWS      = require('aws-sdk'),
    AWS  = require('aws-sdk-mock');

// #######################################
// SPECS MODULES
// #######################################

require('../../config/express');
let message = require('./stub/bounce.js');
let expect = chai.expect;
chai.should();

// #######################################
// NPM MODULES
// #######################################

let History = require('mongoose').model('history');

// #######################################
// LOCAL MODULES
// #####################################

let Scenario            = require('../builders/builder.js'),
    EmailQueueFactory   = require('../../app/queue/email.queue.factory.js'),
    historyService      = require('../../app/service/history.js'),
    task_type           = require('../../app/model/task-type.js');

// #######################################
// TESTS
// #######################################

describe('Queue', () => {

  beforeEach((done) => {
    Scenario.clearDB().then(() => {
      AWS.mock('SQS', 'getQueueUrl', { QueueUrl : 'https://sqs.us-east-1.amazonaws.com/554544/myqueue' });
      done();
    });
  });

  afterEach(() => {
    AWS.restore('SQS');
  });

  it('when receive message forward to history', (done) => {

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
        return EmailQueueFactory.createBounceQueue('email-bounce');
      })
      .then((queue) => {

        sinon.stub(queue.app.sqs, 'receiveMessage', () => {
          queue.app._processMessage(message);
        });

        sinon.stub(queue.app.sqs, 'deleteMessage', () => { });

        let successHandler = sinon.spy(queue, '_successHandler');
        queue.listen();

        Q.delay(500)
          .then(() => {
            sinon.assert.calledOnce(successHandler);
            return History.findOne({ _id : history._id });
          })
          .then((history) => {

            expect(history).to.not.be.null;
            expect(history._id).to.not.be.null;
            expect(history.task.toString()).to.equal(task._id.toString());
            expect(history.actions).to.have.length.above(0);
            expect(history.actions[0].type).to.be.equal('EMAIL');
            expect(history.actions[0].email_status).to.be.equal('BOUNCE');
            expect(history.actions[0].created_at).to.not.be.null;

            // RESTORE
            successHandler.restore();
            done();
          });
      });
  });

  describe('When fail', () => {

    it('should rollback message to queue', (done) => {
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
          return EmailQueueFactory.createBounceQueue('email-bounce');
        })
        .then((queue) => {

          sinon.stub(queue.app.sqs, 'receiveMessage', () => {
            queue.app._processMessage(message);
          });

          sinon.stub(queue.app.sqs, 'deleteMessage', () => {});
          let historyServiceStub = sinon.stub(historyService, 'logByMessageId', () => {
            return Promise.reject('FAKE ERROR');
          });

          let _messageErrorResolver = sinon.spy(queue, '_messageErrorResolver');
          queue.listen();

          Q.delay(500)
            .then(() => {
              sinon.assert.calledOnce(_messageErrorResolver);

              //RESET STUBS
              historyServiceStub.restore();
              _messageErrorResolver.restore();
              done();
            });
        });

      });
  });

});
