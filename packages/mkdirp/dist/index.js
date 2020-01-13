"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

const mkdirp = require('mkdirp');

function _default(dir, opts) {
  return new Promise((resolve, reject) => {
    mkdirp(dir, opts, (err, made) => {
      if (err) {
        return reject(err);
      }

      return resolve(made);
    });
  });
}

module.exports = exports.default;