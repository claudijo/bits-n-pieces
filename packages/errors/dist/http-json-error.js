"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const HttpError = require('./http-error');

class HttpJsonError extends HttpError {
  constructor(status, errors, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(status, JSON.stringify(errors), ...params); // Maintains proper stack trace for where our error was thrown (only available on V8)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpJsonError);
    }

    this.name = 'HttpJsonError';
    this.errors = errors;
  }

}

exports.default = HttpJsonError;
module.exports = exports.default;