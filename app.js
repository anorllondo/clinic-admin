const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Подключение к базе данных
require('./config/db');

// Настройка EJS
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Маршруты
const diseaseRoutes = require('./routes/diseases');
const doctorRoutes = require('./routes/doctors');
const patientRoutes = require('./routes/patients');
const journalRoutes = require('./routes/journals');
app.use('/diseases', diseaseRoutes);
app.use('/doctors', doctorRoutes);
app.use('/patients', patientRoutes);
app.use('/journals', journalRoutes);

// Главная страница
app.get('/', (req, res) => {
  res.render('index');
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});