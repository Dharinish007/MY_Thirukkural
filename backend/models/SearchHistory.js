const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  query: {
    type: String,
    required: true
  },
  filters: {
    paal: String,
    adhigaramNumber: Number,
    completed: Boolean,
    difficulty: String
  },
  resultCount: {
    type: Number,
    default: 0
  },
  searchedAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Keep only last 50 searches per user
searchHistorySchema.index({ userId: 1, searchedAt: -1 });

module.exports = mongoose.model('SearchHistory', searchHistorySchema);
