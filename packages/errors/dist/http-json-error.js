"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const HttpError = require('./http-error');

class HttpJsonError extends HttpError {
  constructor(status, errors, ...params) {
    super(status, JSON.stringify(errors), ...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpJsonError);
    }

    this.name = 'HttpJsonError';
    this.errors = errors;
  }

}

exports.default = HttpJsonError;
module.exports = exports.default;