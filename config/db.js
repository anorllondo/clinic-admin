const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('Подключение к MongoDB успешно'))
  .catch(err => console.error('Ошибка подключения к MongoDB:', err));

module.exports = mongoose;

