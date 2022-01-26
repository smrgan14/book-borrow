const Joi = require('joi');

const authorSchema = Joi.object().keys(
  {
		firstName: Joi.string().required(),
		lastName: Joi.string().required()
	}
)

module.exports = { authorSchema };
