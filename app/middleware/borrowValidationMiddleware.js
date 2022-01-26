const borrowValidationSchema = require('../validation/borrowValidation');

class BorrowValidationMiddleware {
  async validateBorrowData(req, res, next) {
    try {
      const { error } = await borrowValidationSchema.borrowSchema.validate(req.body);
      const valid = error == null;

      if (valid) {
        next();
      } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(',');

        res.status(422).json({ error: message });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = new BorrowValidationMiddleware();
