const jwt = require('jsonwebtoken');

function sign(payload, secret, options = {}) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (error, token) => {
      if (error) {
        return reject(error);
      }
      resolve(token);
    });
  });
}

module.exports = {
  sign,
};