
const mongoose = require("mongoose");

const kuralSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true, index: true },
  adhigaramNumber: { type: Number, required: true, index: true },
  tamilText: { type: String, required: true },
  paal: { type: String, required: true, default: "Arathupal", index: true },
  paalId: { type: Number, default: 1 },
  mv: { type: String, required: true },
  sp: { type: String, required: true },
  mk: { type: String, required: true },
  line1: String,
  line2: String,
  translation: String,
  explanation: String,
  couplet: String,
  transliteration1: String,
  transliteration2: String,
  phoneticText: String, // Full phonetic transliteration for search
  audioUrl: String, // URL to audio file for Reels
  difficultyLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  themes: [String], // Tags like 'wisdom', 'knowledge', 'friendship'
  viewCount: { type: Number, default: 0 },
  likeCount: { type: Number, default: 0 },
  shareCount: { type: Number, default: 0 }
}, {
  timestamps: true
});

// Text search index for efficient searching
kuralSchema.index({ 
  tamilText: 'text', 
  translation: 'text', 
  explanation: 'text', 
  phoneticText: 'text' 
});

module.exports = mongoose.model("Kural", kuralSchema);
