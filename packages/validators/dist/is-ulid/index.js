'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  ulid.test(value);
};

var _require = require('@claudijo/formats'),
    ulid = _require.ulid;

module.exports = exports.default;