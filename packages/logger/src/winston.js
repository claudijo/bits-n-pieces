const winston = require('winston');
const WinstonDailyRotateFile = require('winston-daily-rotate-file');

const format = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
    info => `${info.timestamp} ${info.level} ${info.message}`,
  )
);

const logger = winston.createLogger({
  format,
  level: 'info',
  transports: [
    new WinstonDailyRotateFile({
      filename: './logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
    }),
    new WinstonDailyRotateFile({
      filename: './logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
    })
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console());
}

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;