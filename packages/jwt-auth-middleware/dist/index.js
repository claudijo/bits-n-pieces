'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = jwtAuth;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwt = require('jsonwebtoken');
var changeCase = require('change-case');

function jwtAuth(secret) {
  return function (req, res, next) {
    var _req$headers$authoriz = req.headers.authorization,
        authorization = _req$headers$authoriz === undefined ? '' : _req$headers$authoriz;

    var match = authorization.match(/^Bearer (.*)/i);
    var token = match && match[1];

    if (!token) {
      var error = new Error('MISSING_JWT');
      error.status = 400;
      return next(error);
    }

    return jwt.verify(token, secret, function (error, decoded) {
      if (error) {
        return next((0, _extends3.default)({}, error, {
          message: changeCase.snakeCase(error.message).toUpperCase(),
          status: 403
        }));
      }

      var stripped = (0, _extends3.default)({}, decoded);

      delete stripped.iat;
      delete stripped.exp;

      res.locals = (0, _extends3.default)({}, res.locals, stripped);

      return next();
    });
  };
}
module.exports = exports.default;