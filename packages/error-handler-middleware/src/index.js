const send = require('@polka/send-type');
const http = require('http');
const requestIp = require('request-ip');
const logger = require('@claudijo/logger');

// eslint-disable-next-line no-unused-vars
export default function onError(err, req, res, next) {
  const {
    name, stack, message, status, code, ...rest
  } = err;
  const statusCode = status || code || 500;

  const ip = requestIp.getClientIp(req);

  logger.error({
    code: statusCode,
    message: err.message,
    url: req.originalUrl,
    method: req.method,
    ip,
  });

  send(res, statusCode, Object.keys(rest).length ? rest : {
    errors: [{ message: http.STATUS_CODES[statusCode] }],
  });
}
