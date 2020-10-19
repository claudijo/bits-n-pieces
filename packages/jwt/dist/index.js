"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sign = sign;
exports.verify = verify;

const jwt = require('jsonwebtoken');

function sign(payload, secret, options = {}) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (error, token) => {
      if (error) {
        return reject(error);
      }

      return resolve(token);
    });
  });
}

function verify(token, secret, options = {}) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, options, (error, decoded) => {
      if (error) {
        return reject(error);
      }

      return resolve(decoded);
    });
  });
}