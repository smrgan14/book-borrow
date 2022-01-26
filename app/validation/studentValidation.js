const Joi = require('joi');

const studentSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  birthdate: Joi.date().required(),
  gender: Joi.string().required(),
  grade: Joi.string().required(),
});

module.exports = { studentSchema };
