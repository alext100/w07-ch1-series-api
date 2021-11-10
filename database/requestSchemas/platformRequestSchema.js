const { Joi } = require("express-validation");

const platformRequestSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    img: Joi.string().required(),
  }),
};

module.exports = { platformRequestSchema };
