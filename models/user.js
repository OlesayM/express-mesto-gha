const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'поле "name" должно быть обязательно заполнено'],
      minlength: [2, 'минимальная длина поля "name" - 2'],
      maxlength: [30, 'минимальная длина поля "name" - 30'],
    },
    about: {
      type: String,
      required: [true, 'поле "about" должно быть обязательно заполнено'],
      minlength: [2, 'минимальная длина поля "about" - 2'],
      maxlength: [30, 'минимальная длина поля "about" - 30'],
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Неправильно заполнено поле, укажите URL',
      },
    },
  },
  { versionKey: false },
);
module.exports = mongoose.model('user', userSchema);
