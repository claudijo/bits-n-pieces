const http = require('http');

class HttpError extends Error {
  constructor(status, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }

    this.name = 'HttpError';
    this.message = params[0] || http.STATUS_CODES[status];
    this.status = status;
  }
}

module.exports = HttpError;