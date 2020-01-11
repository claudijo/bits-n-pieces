'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var winston = require('winston');
var WinstonDailyRotateFile = require('winston-daily-rotate-file');

var format = winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.timestamp(), winston.format.align(), winston.format.printf(function (info) {
  return info.timestamp + ' ' + info.level + ' ' + info.message;
}));

var logger = winston.createLogger({
  format: format,
  level: 'info',
  transports: [new WinstonDailyRotateFile({
    filename: './logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'error'
  }), new WinstonDailyRotateFile({
    filename: './logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD'
  })]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console());
}

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function write(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  }
};

exports.default = logger;
module.exports = exports.default;