'use strict';

let mongoose = require('mongoose'),
    audit    = require('./audit/audit.js');
    
let Schema   = mongoose.Schema;
let schema   = new Schema({

  company       : { type : Schema.ObjectId, ref : 'company', required : true },
  customer      : { type : Schema.ObjectId, ref : 'customer', required : true},

  department    : { type : Schema.ObjectId, ref : 'department', required : true },
  regime        : { type : String, required : true },
  type          : { type : String, required : true },

  owner         : { type : Schema.ObjectId, ref : 'user' },
  collaborators : [{ type : Schema.ObjectId, ref : 'user' }],

  dueDate       : { type : Date },
  legalDate     : { type : Date },
  finishedDate  : { type : Date }

}, { collection : 'task' , shardKey : { company : 1 } });

audit.configure(schema, 'task', 'name');

mongoose.model('task', schema, 'task');