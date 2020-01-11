const send = require('@polka/send-type');
const http = require('http');
const requestIp = require('request-ip');
const winston = require('@claudijo/logger');

// eslint-disable-next-line no-unused-vars
export default function onError(err, req, res, next) {
  const {
    name, stack, message, status, code, ...rest
  } = err;
  const statusCode = status || code || 500;

  const ip = requestIp.getClientIp(req);

  winston.error([statusCode, err.message, req.originalUrl, req.method, ip].join(' - '));

  send(res, statusCode, Object.keys(rest).length ? rest : {
    errors: [{ message: http.STATUS_CODES[statusCode] }],
  });
}
