const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  isSystem: {
    type: Boolean,
    default: false
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  kurals: [{
    type: Number,
    ref: 'Kural'
  }],
  theme: String,
  coverImage: String,
  playCount: {
    type: Number,
    default: 0
  },
  likeCount: {
    type: Number,
    default: 0
  },
  tags: [String]
}, {
  timestamps: true
});

// Index for searching playlists
playlistSchema.index({ name: 'text', description: 'text', tags: 'text' });
playlistSchema.index({ isSystem: 1, isPublic: 1 });

module.exports = mongoose.model('Playlist', playlistSchema);
