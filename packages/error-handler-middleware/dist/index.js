'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = onError;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var send = require('@polka/send-type');
var http = require('http');
var requestIp = require('request-ip');
var winston = require('@claudijo/logger');

// eslint-disable-next-line no-unused-vars
function onError(err, req, res, next) {
  var name = err.name,
      stack = err.stack,
      message = err.message,
      status = err.status,
      code = err.code,
      rest = (0, _objectWithoutProperties3.default)(err, ['name', 'stack', 'message', 'status', 'code']);

  var statusCode = status || code || 500;

  var ip = requestIp.getClientIp(req);

  winston.error([statusCode, err.message, req.originalUrl, req.method, ip].join(' - '));

  send(res, statusCode, (0, _keys2.default)(rest).length ? rest : {
    errors: [{ message: http.STATUS_CODES[statusCode] }]
  });
}
module.exports = exports.default;