const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');

// Получение всех врачей
router.get('/', async (req, res) => {
  const doctors = await Doctor.find();
  res.render('doctors/index', { doctors });
});

// Форма для добавления/редактирования
router.get('/new', (req, res) => {
  res.render('doctors/form', { doctor: null });
});

router.get('/edit/:id', async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  res.render('doctors/form', { doctor });
});

// Добавление врача
router.post('/', async (req, res) => {
  const { name, specialty, phone } = req.body;
  const doctor = new Doctor({ name, specialty, phone });
  await doctor.save();
  res.redirect('/doctors');
});

// Обновление врача
router.post('/update/:id', async (req, res) => {
  const { name, specialty, phone } = req.body;
  await Doctor.findByIdAndUpdate(req.params.id, { name, specialty, phone });
  res.redirect('/doctors');
});

// Удаление врача
router.get('/delete/:id', async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.redirect('/doctors');
});

// Поиск врачей по имени
router.get('/search', async (req, res) => {
  const { name } = req.query;
  const doctors = await Doctor.find({ name: new RegExp(name, 'i') });
  res.render('doctors/index', { doctors });
});

router.get('/', async (req, res) => {
  console.log('Попытка загрузки /doctors');
  const doctors = await Doctor.find();
  res.render('doctors/index', { doctors });
});

module.exports = router;