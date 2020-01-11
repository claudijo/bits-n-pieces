const jwt = require('jsonwebtoken');

export function sign(payload, secret, options = {}) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (error, token) => {
      if (error) {
        return reject(error);
      }
      resolve(token);
    });
  });
}
