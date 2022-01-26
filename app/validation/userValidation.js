const Joi = require('joi');

const userSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: {
      allow: ['com', 'net'],
    },
  }),
  password: Joi.string().min(8).required(),
});

module.exports = { userSchema };
