const mongoose = require('mongoose');

const notificationScheduleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true
  },
  enabled: {
    type: Boolean,
    default: true
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'custom'],
    default: 'daily'
  },
  times: [{
    hour: { type: Number, min: 0, max: 23 },
    minute: { type: Number, min: 0, max: 59 }
  }],
  daysOfWeek: [{
    type: Number,
    min: 0,
    max: 6 // 0 = Sunday, 6 = Saturday
  }],
  priorityPaals: [{
    type: String,
    enum: ['Arathupal', 'Porutpal', 'Kamathupal']
  }],
  priorityAdhigarams: [Number],
  learningMode: {
    type: String,
    enum: ['balanced', 'sequential', 'random', 'thematic'],
    default: 'balanced'
  },
  timezone: {
    type: String,
    default: 'Asia/Kolkata'
  },
  lastNotificationSent: Date,
  notificationCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('NotificationSchedule', notificationScheduleSchema);
