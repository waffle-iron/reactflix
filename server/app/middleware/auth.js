'use strict';

// #######################################
// NPM MODULES
// #######################################

let docs     = require("express-mongoose-docs"),
    mongoose = require('mongoose'),
    passport = require('passport');


// #######################################
// LOCAL MODULES
// #######################################

let api = (app) => {

  // API doc generation.
  docs(app, mongoose);

  app.use('/*', passport.authenticate('jwt', { session: false }),
    function(req, res, next) {
      next();
    }
  );
};

module.exports = api;