const Joi = require('joi');

const bookSchema = Joi.object().keys(
    {
      name: Joi.string().required(),
      pagecount: Joi.number().min(1).required(),
      authorId: Joi.array().items(Joi.string().valid('authorId')),
      bookTypeId: Joi.string().required()
    }
)

module.exports = { bookSchema };
