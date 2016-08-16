'use strict';

// #######################################
// NPM MODULES
// #######################################

let auditLog = require('audit-log');

// #######################################
// METHODS
// #######################################

let configure = (schema, modelName, namePath) => {
  let pluginFn = auditLog.getPlugin('mongoose', { modelName: modelName, namePath: namePath });
  schema.plugin(pluginFn.handler);
};

module.exports.configure = configure;