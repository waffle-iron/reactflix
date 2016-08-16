'use strict';

const LOGGER = require('../../config/logger.js');

let Model       = require('mongoose').model('department');
let roleFilter  = require('./role-filter');

let api = (app) => {

  app.get('/department', roleFilter.department, (req, res) => {
    list(req, res, req.query.page, req.query.limit, req.query.sort);
  });
  
};

let list = (req, res, page = 1, limit = 10, sort = 'name') => {
  let opts = Object.assign({ page, limit, sort }, { select: { id: 1, name: 1 } });
  let query = Object.assign({ company: req.user.company }, req.filter);

  Model.paginate(query, opts)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      LOGGER.error(err);
      res.sendStatus(500);
    });
};

module.exports = api;