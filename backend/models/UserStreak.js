const mongoose = require('mongoose');

const userStreakSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
  lastActivityDate: Date,
  streakStartDate: Date,
  totalDaysActive: {
    type: Number,
    default: 0
  },
  achievements: [{
    type: {
      type: String,
      enum: ['streak_7', 'streak_30', 'streak_100', 'paal_complete', 'adhigaram_complete', 'all_complete']
    },
    earnedAt: {
      type: Date,
      default: Date.now
    },
    metadata: mongoose.Schema.Types.Mixed
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('UserStreak', userStreakSchema);
