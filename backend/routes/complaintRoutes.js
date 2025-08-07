const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { 
    createComplaint, 
    getAllComplaints, 
    getComplaintById, 
    updateComplaintStatus 
} = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware'); // Import security middleware

// --- Multer Configuration for file uploads ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        // Create a unique filename to prevent overwriting files with the same name
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const fileFilter = (req, file, cb) => {
    // Allow images and PDFs only for security
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images and PDFs are allowed.'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
// --- End Multer Configuration ---


// --- Route Definitions ---

// PUBLIC ROUTE: Anyone can submit a new complaint with an optional file.
// POST /api/complaints
router.post('/', upload.single('evidenceFile'), createComplaint);

// PROTECTED ROUTE: Only a logged-in admin can get a list of all complaints.
// GET /api/complaints
router.get('/', protect, getAllComplaints);

// PUBLIC ROUTE: Anyone with a valid ID can track the status of their complaint.
// GET /api/complaints/:id
router.get('/:id', getComplaintById);

// PROTECTED ROUTE: Only a logged-in admin can update the status of a complaint.
// PUT /api/complaints/:id
router.put('/:id', protect, updateComplaintStatus);


module.exports = router;