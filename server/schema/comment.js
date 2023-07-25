const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {   // Save Username
    type: String,
    required: true,
  },
  secret: { // Save SecretID
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Secret',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
