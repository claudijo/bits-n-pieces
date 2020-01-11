'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitizeErrors = sanitizeErrors;
exports.errorDetails = errorDetails;
function sanitizeErrors(prefix, errors) {
  return errors.map(function (error) {
    error.field = error.field.replace('data', prefix);
    return error;
  });
}

function errorDetails(field, message) {
  return { field: field, message: message };
}