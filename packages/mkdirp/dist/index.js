'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = function (dir, opts) {
  return new _promise2.default(function (resolve, reject) {
    mkdirp(dir, opts, function (err, made) {
      if (err) {
        return reject(err);
      }

      return resolve(made);
    });
  });
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mkdirp = require('mkdirp');

module.exports = exports.default;