const jwt = require('jsonwebtoken');
const changeCase = require('change-case');

const jwtAuth = secret => (req, res, next) => {
  const { authorization = '' } = req.headers;
  const match = authorization.match(/^Bearer (.*)/i);
  const token = match && match[1];

  if (!token) {
    const error = new Error('MISSING_JWT');
    error.status = 400;
    return next(error);
  }

  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      error.message = changeCase.snakeCase(error.message).toUpperCase();
      error.status = 403;
      return next(error);
    }

    delete decoded.iat;
    delete decoded.exp;

    res.locals = { ...res.locals, ...decoded };

    next();
  });
};

module.exports = jwtAuth;
