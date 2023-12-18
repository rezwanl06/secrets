const mongoose = require('mongoose');

// Create Secret schema and export
const secretSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {   // Save userID
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Secret = mongoose.model('Secret', secretSchema);

module.exports = Secret;
