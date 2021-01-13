const send = require('@polka/send-type');
const http = require('http');
const requestIp = require('request-ip');
const logger = require('@claudijo/logger');
const Rollbar = require('rollbar');

const { ROLLBAR_ACCESS_TOKEN, NODE_ENV } = process.env;

let rollbar;

if (ROLLBAR_ACCESS_TOKEN && NODE_ENV === 'production') {
  rollbar = new Rollbar({
    accessToken: ROLLBAR_ACCESS_TOKEN,
    environment: NODE_ENV,
    captureUncaught: true,
    captureUnhandledRejections: true,
  });
}

// eslint-disable-next-line no-unused-vars, import/prefer-default-export
export function onError(err, req, res, next) {
  const {
    stack = '', status, code, ...rest
  } = err;
  let statusCode = parseInt(status || code || 500, 10);

  if (Number.isNaN(statusCode) || statusCode < 400 || statusCode > 599) {
    statusCode = 500;
  }

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

    if (rollbar) {
      rollbar.error(err, req);
    }
  }

  const error = {
    ...rest,
    message: err.message || http.STATUS_CODES[statusCode],
  };

  if (env === 'development') {
    error.stack = stack;
  }

  send(res, statusCode, { errors: [error] });
}
