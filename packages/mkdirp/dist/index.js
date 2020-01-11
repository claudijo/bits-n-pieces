'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (dir, opts) {
  return new Promise(function (resolve, reject) {
    mkdirp(dir, opts, function (err, made) {
      if (err) {
        return reject(err);
      }

      return resolve(made);
    });
  });
};

var mkdirp = require('mkdirp');

module.exports = exports.default;