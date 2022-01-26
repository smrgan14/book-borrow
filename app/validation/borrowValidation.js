const Joi = require('joi');

const borrowSchema = Joi.object().keys({
  studentId: Joi.string().required(),
  bookId: Joi.array().items(Joi.string().valid('bookId')),
  takenDate: Joi.date().required(),
  broughtDate: Joi.date().required(),
});

module.exports = { borrowSchema };
