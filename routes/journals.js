const express = require('express');
const router = express.Router();
const Journal = require('../models/journal');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const Disease = require('../models/disease');

// Получение всех записей журнала
router.get('/', async (req, res) => {
  const journals = await Journal.find().populate('patient_id doctor_id disease_id');
  res.render('journals/index', { journals });
});

// Форма для добавления/редактирования
router.get('/new', async (req, res) => {
  const doctors = await Doctor.find();
  const patients = await Patient.find();
  const diseases = await Disease.find();
  res.render('journals/form', { journal: null, doctors, patients, diseases });
});

router.get('/edit/:id', async (req, res) => {
  const journal = await Journal.findById(req.params.id).populate('patient_id doctor_id disease_id');
  const doctors = await Doctor.find();
  const patients = await Patient.find();
  const diseases = await Disease.find();
  res.render('journals/form', { journal, doctors, patients, diseases });
});

// Добавление записи в журнал
router.post('/', async (req, res) => {
  const { patient_id, doctor_id, disease_id, date, notes } = req.body;
  const journal = new Journal({ patient_id, doctor_id, disease_id, date, notes });
  await journal.save();
  res.redirect('/journals');
});

// Обновление записи в журнале
router.post('/update/:id', async (req, res) => {
  const { patient_id, doctor_id, disease_id, date, notes } = req.body;
  await Journal.findByIdAndUpdate(req.params.id, { patient_id, doctor_id, disease_id, date, notes });
  res.redirect('/journals');
});

// Удаление записи из журнала
router.get('/delete/:id', async (req, res) => {
  await Journal.findByIdAndDelete(req.params.id);
  res.redirect('/journals');
});

// Поиск записей по имени пациента
router.get('/search', async (req, res) => {
  const { patientName } = req.query;
  const journals = await Journal.find().populate('patient_id doctor_id disease_id');
  const filteredJournals = journals.filter(journal => 
    journal.patient_id.name && journal.patient_id.name.match(new RegExp(patientName, 'i'))
  );
  res.render('journals/index', { journals: filteredJournals });
});

module.exports = router;