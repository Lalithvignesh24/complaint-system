// backend/controllers/complaintController.js
const Complaint = require('../models/Complaint');
const nodemailer = require('nodemailer');
// ... (transporter setup remains the same)

// UPDATE THE createComplaint function
exports.createComplaint = async (req, res) => {
    try {
        const { title, description, category } = req.body;

        const newComplaint = new Complaint({
            title,
            description,
            category,
        });

        // If a file was uploaded, add its path to the complaint document
        if (req.file) {
            newComplaint.filePath = req.file.path;
        }

        const savedComplaint = await newComplaint.save();
        
        // ... (email notification logic remains the same)

        res.status(201).json({ 
            message: 'Complaint submitted successfully!', 
            complaintId: savedComplaint._id 
        });

    } catch (error) {
        res.status(500).json({ message: 'Error submitting complaint', error: error.message });
    }
};

// ... (other controller functions remain the same)

// Get all complaints (for admin)
exports.getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 });
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching complaints' });
    }
};

// Get a single complaint by ID (for user tracking)
exports.getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching complaint' });
    }
};

// Update complaint status (for admin)
exports.updateComplaintStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true } // Return the updated document
        );
        if (!updatedComplaint) return res.status(404).json({ message: 'Complaint not found' });
        res.status(200).json(updatedComplaint);
    } catch (error) {
        res.status(500).json({ message: 'Error updating status' });
    }
};