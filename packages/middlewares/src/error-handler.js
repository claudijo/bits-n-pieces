const send = require('@polka/send-type');
const http = require('http');
const requestIp = require('request-ip');
const winston = require('../logger/winston');

module.exports = function onError(err, req, res, next) {
  console.error(err.stack);

  const { name, stack, message, status, code, ...rest } = err;
  const statusCode = status || code || 500;

  const ip = requestIp.getClientIp(req);

  winston.error([statusCode, err.message, req.originalUrl, req.method, ip].join(' - '));

  send(res, statusCode, Object.keys(rest).length ? rest : {
    errors: [{ message: http.STATUS_CODES[statusCode] }],
  });
};