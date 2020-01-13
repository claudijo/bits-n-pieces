"use strict";

const {
  monotonicFactory
} = require('ulid');

const ulid = monotonicFactory();

const ulidToLowerCase = (...args) => ulid(...args).toLowerCase();

module.exports = ulidToLowerCase;