"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ValidationError extends Error {
  constructor(errors, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params); // Maintains proper stack trace for where our error was thrown (only available on V8)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }

    this.name = 'ValidationError';
    this.errors = errors;
  }

}

exports.default = ValidationError;
module.exports = exports.default;