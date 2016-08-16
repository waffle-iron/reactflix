'use strict';

let Schema = require('mongoose').Schema;

let plugin =  function(schema, options) {

  schema.add({ created_at : Date });
  schema.add({ created_by : { type: Schema.ObjectId, ref: 'user' } });
  schema.pre('save', function (next) {

    if (!this.created_at) {
      this.created_at = Date.now();
    }
    next();
  });
};

module.exports = plugin;