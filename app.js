const express = require('express');
const mongoose = require('mongoose');
// const routes = require('./routes/router');

const { PORT = 3000 } = process.env;
const app = express();
// добавляет в каждый запрос объект user
app.use((req, res, next) => {
  req.user = {
    _id: '64a71a11e0dcdb4c4a2dbff5',
  };
  next();
});

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('База данных подключена');
  })
  .catch(() => {
    console.log('Не удалось подключиться к Базе данных');
  });
app.use(express.json());
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

// app.use('/*', (req, res) => {
//   res.status(NOT_FOUND)
//     .send({ message: 'NOT_FOUND: Страница не найдена.' }); // В случае не корректного вода адреса
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
