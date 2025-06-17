const mongoose = require('mongoose');
const diseaseSchema = new mongoose.Schema({
  name: String,
  symptoms: [String]
});
module.exports = mongoose.model('Disease', diseaseSchema);