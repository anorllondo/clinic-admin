const mongoose = require('mongoose');
const journalSchema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  disease_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Disease', required: true },
  date: { type: Date, required: true },
  notes: String
});
module.exports = mongoose.model('Journal', journalSchema);