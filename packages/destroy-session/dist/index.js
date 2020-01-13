"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = destroySession;

async function destroySession(req) {
  return new Promise((resolve, reject) => {
    req.session.destroy(error => {
      if (error) {
        return reject(error);
      }

      return resolve();
    });
  });
}

module.exports = exports.default;