const express = require('express');
const router = express.Router();
const Patient = require('../models/patient');

// Получение всех пациентов
router.get('/', async (req, res) => {
  const patients = await Patient.find();
  res.render('patients/index', { patients });
});

// Форма для добавления/редактирования
router.get('/new', (req, res) => {
  res.render('patients/form', { patient: null });
});

router.get('/edit/:id', async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  res.render('patients/form', { patient });
});

// Добавление пациента
router.post('/', async (req, res) => {
  const { name, age, gender, contact } = req.body;
  const patient = new Patient({ name, age, gender, contact });
  await patient.save();
  res.redirect('/patients');
});

// Обновление пациента
router.post('/update/:id', async (req, res) => {
  const { name, age, gender, contact } = req.body;
  await Patient.findByIdAndUpdate(req.params.id, { name, age, gender, contact });
  res.redirect('/patients');
});

// Удаление пациента
router.get('/delete/:id', async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.redirect('/patients');
});

// Поиск пациентов по имени
router.get('/search', async (req, res) => {
  const { name } = req.query;
  const patients = await Patient.find({ name: new RegExp(name, 'i') });
  res.render('patients/index', { patients });
});

module.exports = router;