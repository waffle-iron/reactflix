'use strict';

let mongoose = require('mongoose'),
    audit    = require('./audit/audit.js');

// #######################################
// SCHEMA MODULES
// #######################################

let Schema   = mongoose.Schema;
let schema   = new Schema({

  task      : { type : Schema.ObjectId, ref : 'task', required : true },
  actions   : [{
    type: {
      type         : String, required : true },
      email_status : { type : String},
      created_at   : { type : Date, default : Date.now()}
    }]
}, { collection : 'history' , shardKey : { company : 1 } });

// #######################################
// METHODS MODULES
// #######################################

// schema.methods.findByTask = function (task) {
//   return this.model('history').find({ task : task._id })
//     .then((history) => {
//       return history;
//     });
// };

// #######################################
// CONSTS MODULES
// #######################################

audit.configure(schema, 'history', 'name');
mongoose.model('history', schema, 'history');

module.exports.type = {
  CHAT       : 'CHAT',
  NOTIFY     : 'NOTIFY',
  ATTACHMENT : 'ATTACHMENT',
  EMAIL      : 'EMAIL'
};