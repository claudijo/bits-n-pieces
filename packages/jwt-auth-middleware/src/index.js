const jwt = require('jsonwebtoken');
const changeCase = require('change-case');

export default function jwtAuth(secret) {
  return (req, res, next) => {
    const { authorization = '' } = req.headers;
    const match = authorization.match(/^Bearer (.*)/i);
    const token = match && match[1];

    if (!token) {
      const error = new Error('MISSING_JWT');
      error.status = 400;
      return next(error);
    }

    return jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return next({
          ...error,
          message: changeCase.snakeCase(error.message).toUpperCase(),
          status: 403,
        });
      }

      const stripped = {
        ...decoded,
      };

      delete stripped.iat;
      delete stripped.exp;

      res.locals = { ...res.locals, ...stripped };

      return next();
    });
  };
}
