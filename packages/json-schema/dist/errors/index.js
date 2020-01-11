'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.sanitizeErrors = sanitizeErrors;
exports.errorDetails = errorDetails;
function sanitizeErrors(prefix, errors) {
  return errors.map(function (error) {
    return _extends({}, error, {
      field: error.field.replace('data', prefix)
    });
  });
}

function errorDetails(field, message) {
  return { field: field, message: message };
}