const Joi = require("joi");

const validateCreateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().required().trim(),
    name: Joi.string().required().trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().trim(),
  });
  return schema.validate(user);
};

const validateLoginUser = (user) => {
  const schema = Joi.object({
    identifier: Joi.string().required().trim(),
    password: Joi.string().required().trim(),
  });

  return schema.validate(user);
};

const validateUpdateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required().email().trim(),
    name: Joi.string().required().trim(),
  });

  return schema.validate(user);
};

module.exports = { validateCreateUser, validateLoginUser, validateUpdateUser };
