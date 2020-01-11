const HttpError = require('./http-error');

export default class HttpJsonError extends HttpError {
  constructor(status, errors, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(status, JSON.stringify(errors), ...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpJsonError);
    }

    this.name = 'HttpJsonError';
    this.errors = errors
  }
}
