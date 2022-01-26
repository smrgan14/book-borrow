const Joi = require('joi');

const bookTypeSchema = Joi.object().keys({
  name: Joi.string().required(),
});

module.exports = { bookTypeSchema };
