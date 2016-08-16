'use strict';

// #######################################
// NPM MODULES
// #######################################

let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

// #######################################
// NPM MODULES
// #######################################

let audit = require('./audit/audit.js');

let schema = new Schema({

  company     : { type : Schema.ObjectId, ref : 'company', required : true },
  type        : { type : String         , required : true },
  user        : { type : Schema.ObjectId, ref : 'user', required : true },
  //OPTIONAL
  created_by   : { type : Schema.ObjectId, ref : 'user' },
  viewed_date  : { type : Date },
  qty         : { type : Number },
  task        : { type : Schema.ObjectId, ref : 'task' },
  task_type   : { type : String },
  status      : { type : String }

}, { collection : 'notification', shardKey : { company : 1 } } );

audit.configure(schema, 'notification', 'created_at');

mongoose.model('notification', schema);
