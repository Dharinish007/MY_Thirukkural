const mongoose = require('mongoose');

const kuralSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
    max: 1330
  },
  adhigaramNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 133
  },
  tamilText: {
    type: String,
    required: true
  },
  purul: {
    type: String,
    required: true
  },
  paal: {
    type: String,
    required: true,
    enum: ['Arathupal', 'Porutpal', 'Kamathupal']
  }
});

module.exports = mongoose.model('Kural', kuralSchema);
