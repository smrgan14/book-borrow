const authorValidationSchema = require('../validation/authorValidation');

class AuthorVAlidationMiddleware {
  async validateAuthorData(req, res, next) {
    try {
      const { error } = await authorValidationSchema.authorSchema.validate(req.body);
      const valid = error == null;

      if (valid) {
        next();
      } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");

        res.status(422).json({ error: message });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = new AuthorVAlidationMiddleware();
