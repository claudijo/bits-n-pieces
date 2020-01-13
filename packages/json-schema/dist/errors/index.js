"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitizeErrors = sanitizeErrors;
exports.errorDetails = errorDetails;

function sanitizeErrors(prefix, errors) {
  return errors.map(error => ({ ...error,
    field: error.field.replace('data', prefix)
  }));
}

function errorDetails(field, message) {
  return {
    field,
    message
  };
}