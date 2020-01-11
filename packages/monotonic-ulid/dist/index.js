'use strict';

var _require = require('ulid'),
    monotonicFactory = _require.monotonicFactory;

var ulid = monotonicFactory();

var ulidToLowerCase = function ulidToLowerCase() {
  return ulid.apply(undefined, arguments).toLowerCase();
};

module.exports = ulidToLowerCase;