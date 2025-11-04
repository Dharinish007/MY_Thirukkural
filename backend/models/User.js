const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6
  },
  completedKurals: [{
    kuralNumber: {
      type: Number,
      required: true
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  wishlist: [{
    type: Number
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
