const express = require('express');
const router = express.Router();
const Disease = require('../models/disease');

// Получение всех болезней
router.get('/', async (req, res) => {
  const diseases = await Disease.find();
  res.render('diseases/index', { diseases });
});

// Форма для добавления/редактирования
router.get('/new', (req, res) => {
  res.render('diseases/form', { disease: null });
});

router.get('/edit/:id', async (req, res) => {
  const disease = await Disease.findById(req.params.id);
  res.render('diseases/form', { disease });
});

// Добавление болезни
router.post('/', async (req, res) => {
  const { name, symptoms } = req.body;
  const disease = new Disease({
    name,
    symptoms: symptoms.split(',').map(s => s.trim())
  });
  await disease.save();
  res.redirect('/diseases');
});

// Обновление болезни
router.post('/update/:id', async (req, res) => {
  const { name, symptoms } = req.body;
  await Disease.findByIdAndUpdate(req.params.id, {
    name,
    symptoms: symptoms.split(',').map(s => s.trim())
  });
  res.redirect('/diseases');
});

// Удаление болезни
router.get('/delete/:id', async (req, res) => {
  await Disease.findByIdAndDelete(req.params.id);
  res.redirect('/diseases');
});

// Поиск болезней по названию
router.get('/search', async (req, res) => {
  const { name } = req.query;
  const diseases = await Disease.find({ name: new RegExp(name, 'i') });
  res.render('diseases/index', { diseases });
});

module.exports = router;