'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.sign = sign;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwt = require('jsonwebtoken');

// eslint-disable-next-line import/prefer-default-export
function sign(payload, secret) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return new _promise2.default(function (resolve, reject) {
    jwt.sign(payload, secret, options, function (error, token) {
      if (error) {
        return reject(error);
      }
      return resolve(token);
    });
  });
}