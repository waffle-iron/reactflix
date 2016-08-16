'use strict';

const LOGGER   = require('../../config/logger.js');

let mongoose   = require('mongoose'),
    _          = require('lodash');
let Model      = mongoose.model('user');
let roleFilter = require('./role-filter');

let api = (app) => {

  app.get('/user', roleFilter.user, (req, res) => {

    let paginate = {
      page: req.query.page,
      limit: req.query.limit,
      sort: req.query.sort
    };

    let query = Object.assign({
      company: req.user.company
    }, req.filter);

    if (_.isString(req.query.department))
      Object.assign(query, { 'departments._id': mongoose.Types.ObjectId(req.query.department) });

    list(query, paginate)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        LOGGER.error(err);
        res.sendStatus(500);
      });
  });

  app.get('/user/me', (req, res) => {
    res.status(200).json(req.user);
  });
};

let list = (query, paginate) => {

  let defaults = {
    page  : 1,
    limit : 10,
    sort  : { name: 1 }
  };

  let opts = _.defaults(paginate, defaults, { select: { id: 1, name: 1 } });

  return Model.paginate(query, opts);
};

module.exports = api;