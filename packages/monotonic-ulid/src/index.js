const { monotonicFactory } = require('ulid');

const ulid = monotonicFactory();

const ulidToLowerCase = (...args) => {
  return ulid(...args).toLowerCase();
};

module.exports = ulidToLowerCase;