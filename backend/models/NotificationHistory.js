const mongoose = require('mongoose');

const notificationHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  kuralNumber: {
    type: Number,
    required: true
  },
  sentAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  opened: {
    type: Boolean,
    default: false
  },
  openedAt: Date,
  action: {
    type: String,
    enum: ['completed', 'wishlisted', 'shared', 'skipped', 'none'],
    default: 'none'
  },
  actionAt: Date
}, {
  timestamps: true
});

// Compound index for user queries
notificationHistorySchema.index({ userId: 1, sentAt: -1 });

module.exports = mongoose.model('NotificationHistory', notificationHistorySchema);
