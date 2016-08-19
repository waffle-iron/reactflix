'use strict';

// #######################################
// NPM MODULES
// #######################################


let moment = require('moment');

// #######################################
// LOCAL MODULES
// #######################################
require('../../config/express');

let Scenario          = require('../builders/builder.js'),
    task_type         = require('../../app/model/task-type.js'),
    notification_type = require('../../app/model/notification-type.js'),
    LOGGER            = require('../../config/logger');


describe('Database', () => {

  // beforeEach((done) => {
  //   Scenario.clearDB().then(done);
  // });

  it('insert mocks', (done) => {
    let scenario = new Scenario();
    let redspark = scenario.company('redspark');
    let department = scenario.department('FISCAL', redspark);
    let timeoutzero = scenario.customer('timeoutzero', 'REAL_PROFIT', redspark);
    let lucas = scenario.user('Lucas', redspark, department);
    let carlos = scenario.user('Carlos', redspark, department);
    let task1 = scenario.task('Geração de XPTO', task_type.SERVICE_ORDER, timeoutzero, lucas);

    scenario.notification(notification_type.TASK_INFO, lucas, { qty: 28, task_type: task_type.SERVICE_ORDER, status: 'DUE', created_at: +moment() });
    scenario.notification(notification_type.TASK_INFO, lucas, { qty: 6 , task_type: task_type.RECURRENT, status: 'TO_DUE', created_at: +moment().subtract({ hour: 1 }) });
    scenario.notification(notification_type.TASK_INFO, lucas, { task: task1._id, task_type: task_type.SERVICE_ORDER, status: 'NEW', created_at: +moment().subtract({ hour: 2 }) });
    scenario.notification(notification_type.TRANSFER , lucas, { task: task1._id, task_type: task_type.SERVICE_ORDER, created_at: +moment().subtract({ hour: 4 }) });
    scenario.notification(notification_type.PARTICIPATE, lucas, { task_type: task_type.SERVICE_ORDER, createdBy: carlos._id, created_at: +moment().subtract({ hour: 5 }) });
    scenario.notification(notification_type.MENTION, lucas, { task_type: task_type.SERVICE_ORDER, createdBy: carlos._id, task: task1._id, created_at: +moment().subtract({ hour: 6 }) });
    scenario.notification(notification_type.TASK_INFO, carlos, { qty: 76, task_type: task_type.SERVICE_ORDER, status: 'DUE' });

    scenario.build()
      .then(() => {
        LOGGER.info('[INSERT] Mock`s done!');
        done();
      });
  });
});
