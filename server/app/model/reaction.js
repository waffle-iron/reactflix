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

	videoId : { type : Number, required : true },
	text		: { type : String, required : true, min : 0, max : 140 },

}, { collection : 'reaction' });

audit.configure(schema, 'reaction', 'created_at');

mongoose.model('reaction', schema);