const Joi = require("joi");

const validateNote = (note) => {
  const schema = Joi.object({
    title: Joi.string().required().trim(),
    text: Joi.string().required().trim(),
    isFavorite: Joi.boolean().optional(),
  });
  return schema.validate(note);
};

module.exports = validateNote;
