const jwt = require('jsonwebtoken');

// eslint-disable-next-line import/prefer-default-export
export function sign(payload, secret, options = {}) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (error, token) => {
      if (error) {
        return reject(error);
      }
      return resolve(token);
    });
  });
}
