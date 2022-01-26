const jwt = require('jsonwebtoken');
const config = require('../config');

class ProtectRoutesMiddleware {
  async protectRoutes(req, res, next) {
    try {
      const token = req.headers.authorization;

      if (token) {
        jwt.verify(token, config.jwt.secret_key, (err, decoded) => {
          if (err) {
            res.status(403).send({ warningMessage: 'Invalid token' });
          } else {
            req.decoded = decoded;
            next();
          }
        });
      } else {
        res.send({
          warningMessage: 'No provided token',
        });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = new ProtectRoutesMiddleware();
