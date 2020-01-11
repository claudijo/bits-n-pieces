'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onError;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
      rest = _objectWithoutProperties(err, ['name', 'stack', 'message', 'status', 'code']);

  var statusCode = status || code || 500;

  var ip = requestIp.getClientIp(req);

  winston.error([statusCode, err.message, req.originalUrl, req.method, ip].join(' - '));

  send(res, statusCode, Object.keys(rest).length ? rest : {
    errors: [{ message: http.STATUS_CODES[statusCode] }]
  });
}
module.exports = exports.default;