"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const http = require('http');

class HttpError extends Error {
  constructor(status, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }

    this.name = 'HttpError';
    this.message = params[0] || http.STATUS_CODES[status];
    this.status = status;
  }

}

exports.default = HttpError;
module.exports = exports.default;