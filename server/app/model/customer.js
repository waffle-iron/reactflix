'use strict';

let mongoose = require('mongoose'),
    audit    = require('./audit/audit.js');

let Schema   = mongoose.Schema;

let schema = new Schema({
  
  company    : { type : Schema.ObjectId, ref : 'company', required : true },
  name       : { type : String, required : true },
  regime     : { type : String, required : true }

}, { collection : 'customer', shardKey : { company : 1 } });

audit.configure(schema, 'customer', 'name');

mongoose.model('customer', schema);