const { ulid } = require('../format-patterns');

module.exports = value => ulid.test(value);