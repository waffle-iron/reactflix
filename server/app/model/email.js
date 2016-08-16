'use strict';

let mongoose = require('mongoose'),
    audit    = require('./audit/audit.js');

// #######################################
// SCHEMA MODULES
// #######################################

let Schema   = mongoose.Schema;
let schema   = new Schema({

  messageId : { type : String, required : true },
  history   : { type : Schema.ObjectId, ref : 'history', required : true }

}, { collection : 'email' , shardKey : { company : 1 } });

// #######################################
// CONSTS MODULES
// #######################################

module.exports.type = {
  SEND : 'SEND', DELIVERY : 'DELIVERY', BOUNCE : 'BOUNCE', COMPLAINT : 'COMPLAINT'
};

audit.configure(schema, 'email', 'name');
mongoose.model('email', schema, 'email');