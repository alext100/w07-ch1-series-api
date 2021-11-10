const { Joi } = require("express-validation");

const serieRequestSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    img: Joi.string().required(),
    seen: Joi.boolean().required(),
    platform: Joi.object().required(),
  }),
};

module.exports = { serieRequestSchema };
