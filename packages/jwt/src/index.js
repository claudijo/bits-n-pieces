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

// eslint-disable-next-line import/prefer-default-export
export function verify(token, secret, options = {}) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, options, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      return resolve(decoded);
    });
  });
}
