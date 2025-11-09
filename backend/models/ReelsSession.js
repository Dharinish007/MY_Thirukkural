const mongoose = require('mongoose');

const reelsSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  endedAt: Date,
  kuralsViewed: [{
    kuralNumber: Number,
    viewedAt: Date,
    duration: Number, // seconds
    completed: Boolean,
    wishlisted: Boolean,
    shared: Boolean
  }],
  totalDuration: {
    type: Number,
    default: 0
  },
  completionRate: {
    type: Number,
    default: 0
  },
  sourceType: {
    type: String,
    enum: ['discovery', 'sequential', 'random', 'playlist'],
    default: 'discovery'
  },
  playlistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Playlist'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ReelsSession', reelsSessionSchema);
