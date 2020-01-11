'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = jwtAuth;
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
        return next(_extends({}, error, {
          message: changeCase.snakeCase(error.message).toUpperCase(),
          status: 403
        }));
      }

      var stripped = _extends({}, decoded);

      delete stripped.iat;
      delete stripped.exp;

      res.locals = _extends({}, res.locals, stripped);

      return next();
    });
  };
}
module.exports = exports.default;