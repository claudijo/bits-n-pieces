"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _require = require('@claudijo/formats'),
    ulid = _require.ulid;

function _default(value) {
  ulid.test(value);
}

module.exports = exports.default;