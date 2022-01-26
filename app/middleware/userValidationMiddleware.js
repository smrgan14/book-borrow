const userValidationSchema = require('../validation/userValidation');

class UserValidationMiddleware {
  async validateUserData(req, res, next) {
    try {
      const { error } = await userValidationSchema.userSchema.validate(req.body);
      const valid = error == null;

      if (valid) {
        next();
      } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(',');

        console.log('error', message);
        res.status(422).json({ error: message });
      }
    } catch (error) {}
  }
}

module.exports = new UserValidationMiddleware();
