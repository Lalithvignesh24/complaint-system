// backend/models/Complaint.js

const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending'
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Assuming you have a User model
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// The 'Complaint' model will use the 'complaints' collection in the database
module.exports = mongoose.model('Complaint', complaintSchema);