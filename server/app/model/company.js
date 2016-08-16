'use strict';

let mongoose = require('mongoose'),
    audit    = require('./audit/audit.js');

let Schema   = mongoose.Schema;

let schema = new Schema({
  name       : { type : String, required : true }
}, { collection : 'company'});

audit.configure(schema, 'company', 'name');

mongoose.model('company', schema, 'company');