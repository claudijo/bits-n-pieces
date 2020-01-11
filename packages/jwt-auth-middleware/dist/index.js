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

    jwt.verify(token, secret, function (error, decoded) {
      if (error) {
        error.message = changeCase.snakeCase(error.message).toUpperCase();
        error.status = 403;
        return next(error);
      }

      delete decoded.iat;
      delete decoded.exp;

      res.locals = _extends({}, res.locals, decoded);

      next();
    });
  };
}
module.exports = exports.default;