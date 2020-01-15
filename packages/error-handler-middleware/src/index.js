const send = require('@polka/send-type');
const http = require('http');
const requestIp = require('request-ip');
const logger = require('@claudijo/logger');

// eslint-disable-next-line no-unused-vars, import/prefer-default-export
export function onError(err, req, res, next) {
  const {
    stack = '', status, code, ...rest
  } = err;
  const statusCode = err.status || err.code || 500;

  const { env: { NODE_ENV: env } } = process;

  if (env === 'production' || env === 'stage') {
    const ip = requestIp.getClientIp(req);
    const error = {
      code: statusCode,
      message: err.message || http.STATUS_CODES[statusCode],
      url: req.originalUrl,
      method: req.method,
      ip,
      stack,
    };

    logger.error(error);
  }

  const error = {
    ...rest,
    message: err.message || http.STATUS_CODES[statusCode],
  };

  if (env === 'development') {
    error.stack = stack;
  }

  send(res, code, { errors: [error] });
}
