const mongoose = require('mongoose');

const adhigaramSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
    max: 133
  },
  nameTamil: {
    type: String,
    required: true
  },
  nameEnglish: {
    type: String,
    required: true
  },
  paal: {
    type: String,
    required: true,
    enum: ['Arathupal', 'Porutpal', 'Kamathupal'] // ✅ Matches your seed data exactly
  }
});

module.exports = mongoose.model('Adhigaram', adhigaramSchema);
