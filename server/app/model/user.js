'use strict';

let mongoose  = require('mongoose'),
  audit       = require('./audit/audit.js');

let Schema    = mongoose.Schema;

let schema    = new Schema({

  company     : { type: Schema.ObjectId, ref: 'company', required : true },
  email       : { type: String, required: true, unique : true },
  name        : { type: String, required: true },
  password    : { type: String, required: true },
  role        : { type: String, required: true },
  departments : [{ type: Schema.ObjectId, ref: 'department', default: [] }]

}, { collection : 'user', shardKey : { company : 1 } });

audit.configure(schema, 'user', 'name');

mongoose.model('user', schema);