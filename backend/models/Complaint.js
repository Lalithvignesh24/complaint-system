const mongoose = require('mongoose');

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
  category: {
    type: String,
    enum: ['Sanitation', 'Infrastructure', 'Ragging / Bullying', 'Security', 'Faculty', 'Other'],
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  filePath: {
    type: String
  }
}, {
  timestamps: true
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
