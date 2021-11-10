const { Joi } = require("express-validation");

const registerRequestSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    admin: Joi.boolean().optional(),
  }),
};

module.exports = { registerRequestSchema };
