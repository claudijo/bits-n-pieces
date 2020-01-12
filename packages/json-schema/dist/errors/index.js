'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.sanitizeErrors = sanitizeErrors;
exports.errorDetails = errorDetails;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sanitizeErrors(prefix, errors) {
  return errors.map(function (error) {
    return (0, _extends3.default)({}, error, {
      field: error.field.replace('data', prefix)
    });
  });
}

function errorDetails(field, message) {
  return { field: field, message: message };
}