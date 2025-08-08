const mongoose = require('mongoose');

// Define the schema for a complaint
const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to a User model, if you have one
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create and export the Complaint model
const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;