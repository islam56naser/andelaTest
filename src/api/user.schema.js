const Joi = require('joi');


const createUserSchema = Joi.object().keys({
  username: Joi.string().required().min(1).max(100),
  password: Joi.string().required().min(1).max(100),
  email: Joi.string().required().email(),
});

const loginSchema = Joi.object().keys({
  username: Joi.string().required().min(1).max(100),
  password: Joi.string().required().min(1).max(100),
});



module.exports = {
  createUserSchema,
  loginSchema,
};
