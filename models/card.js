const mongoose = require('mongoose');
// const validator = require('validator');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'поле "name" должно быть обязательно заполнено'],
      minlength: [2, 'минимальная длина поля "name" - 2'],
      maxlength: [30, 'минимальная длина поля "name" - 30'],
    },
    link: {
      type: String,
      required: true,
      validate(value) {
        return /[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/gi.test(value);
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: 'user',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);
module.exports = mongoose.model('card', cardSchema);
