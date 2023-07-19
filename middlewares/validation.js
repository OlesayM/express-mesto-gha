const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const checkUrl = Joi.string().custom((value, helper) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helper.message('Неправильный формат ссылки');
});

const checkEmail = Joi.string().required().email();

const checkCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: checkUrl,
  }),
});

const checkCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

const checkCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: checkUrl,
    email: checkEmail,
    password: Joi.string().required().min(8),
  }),
});

const checkLogin = celebrate({
  body: Joi.object().keys({
    email: checkEmail,
    password: Joi.string().required().min(8),
  }),
});

const checkProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const checkAvatar = celebrate({
  body: Joi.object().keys({
    avatar: checkUrl,
  }),
});

const checkUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  checkCreateUser,
  checkProfile,
  checkAvatar,
  checkCreateCard,
  checkCardId,
  checkUserId,
  checkLogin,
};
