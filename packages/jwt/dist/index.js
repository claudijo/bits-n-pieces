'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sign = sign;
var jwt = require('jsonwebtoken');

function sign(payload, secret) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return new Promise(function (resolve, reject) {
    jwt.sign(payload, secret, options, function (error, token) {
      if (error) {
        return reject(error);
      }
      resolve(token);
    });
  });
}