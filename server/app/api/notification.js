'use strict';

// #######################################
// NPM MODULES
// #######################################

let Model    = require('mongoose').model('notification'),
    validate = require('express-validation');

// #######################################
// LOCAL MODULES
// #######################################

const LOGGER       = require('../../config/logger.js'),
      notification = require('./validation').notification;

// #######################################
// INIT
// #######################################

let api = (app) => {

  app.get('/notification', (req, res) => {

    let query = { user : req.user._id };
    let paginate = {
      page  : req.query.page,
      limit : req.query.limit,
    };

    list(query, paginate)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        LOGGER.error(err);
        res.sendStatus(500);
      });
  });

  app.patch('/notification/viewed', validate(notification), (req, res) => {

    Model.update({ _id : { $in : req.body.ids } }, { $set : { viewed_date : Date.now() }}, { multi : true })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        LOGGER.error(err);
        res.sendStatus(500);
      });
  });
};

let list = (query, paginate) => {

  let defaults = {
    page  : 1,
    limit : 5,
    sort  : { createdAt : -1 }
  };

  let opts = Object.assign({}, defaults, paginate);
  return Model.paginate(query, opts);
};

module.exports = api;