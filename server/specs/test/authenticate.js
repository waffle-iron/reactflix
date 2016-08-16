'use strict';

// #######################################
// SPECS MODULES
// #######################################

let jwt = require('jsonwebtoken');

module.exports = (app, user) => {
  return 'JWT ' + jwt.sign({ id: user._id, companyId: user.companyId }, app.get('secret'), { expiresIn: 84600 });
};