const jwt = require('jsonwebtoken')

const getTokenFromHeaders = (req) => {
    const { cookies: { authorization } } = req

    if (authorization) {
        return authorization
    }

    return null
}

const unauthorizedError = (code, error) => {
    this.name = "UnauthorizedError";
    this.message = error.message;
    Error.call(this, error.message);
    Error.captureStackTrace(this, this.constructor);
    this.code = code;
    this.status = 401;
    this.inner = error;
}

module.exports = {
  required: function (req, res, next) {
    token = getTokenFromHeaders(req)
    if (token === null) {
      return res.status(401).json({ error: { message: 'No authorization token was found.', code: 'credentials_required' }}).send();
    }

    jwt.verify(token, process.env.NODE_ENV === 'development' ? 'secret' : process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: { message: 'Invalid authorization token.', code: 'invalid_credentials' }}).send();
      } else {
        req.user = decoded;
        return next();
      }
    })

  },
  optional: function (req, res, next) {
    token = getTokenFromHeaders(req)
    if (token === null) {
      return next();
    }

    jwt.verify(token, process.env.NODE_ENV === 'development' ? 'secret' : process.env.SECRET, (err, decoded) => {
      if (err) {
        return next();
      } else {
        req.user = decoded;
        return next();
      }
    })
  }
};
