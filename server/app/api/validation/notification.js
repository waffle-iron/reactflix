'use strict';

let Joi = require('joi');

module.exports = {
  options : { allowUnknownBody: false },
  body    : {
    ids : Joi.array().required()
  }
};