const studentValidationSchema = require('../validation/studentValidation');

class StudentValidationMiddleware {
  async validateStudentData(req, res, next) {
    try {
      const { error } = await studentValidationSchema.studentSchema(req.body);
      const valid = error == null;

      if (valid) {
        next();
      } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(',');

        console.log('error', message);
        res.status(422).json({ error: message });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = new StudentValidationMiddleware();
