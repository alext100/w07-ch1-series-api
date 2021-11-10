const { Joi } = require("express-validation");

const loginRequestSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    admin: Joi.boolean().optional(),
  }),
};

module.exports = { loginRequestSchema };
