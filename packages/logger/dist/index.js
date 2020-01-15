"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const winston = require('winston');

const morgan = require('morgan'); // eslint-disable-next-line new-cap


const logger = new winston.createLogger({
  transports: [new winston.transports.Console({
    level: 'info',
    handleExceptions: true,
    json: true,
    prettyPrint: process.env.NODE_ENV === 'development',
    colorize: process.env.NODE_ENV === 'development'
  })],
  exitOnError: false
});
const jsonRequestFormat = {
  remote_addr: ':remote-addr',
  remote_user: ':remote-user',
  date: ':date[clf]',
  method: ':method',
  url: ':url',
  http_version: ':http-version',
  status: ':status',
  result_length: ':res[content-length]',
  referrer: ':referrer',
  user_agent: ':user-agent',
  response_time: ':response-time'
};
logger.stream = {
  // eslint-disable-next-line no-unused-vars
  write(message, encoding) {
    logger.info(message);
  }

};

logger.requestHandler = () => morgan(JSON.stringify(jsonRequestFormat), {
  stream: logger.stream
});

var _default = logger;
exports.default = _default;
module.exports = exports.default;