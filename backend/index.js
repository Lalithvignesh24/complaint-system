require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const complaintRoutes = require('./routes/complaintRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: '*', // Allow all origins for testing on mobile (you can restrict later)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/complaints', complaintRoutes);
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB connected successfully');

        const PORT = process.env.PORT || 5000;

        // Listen on 0.0.0.0 so other devices on the network can access
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Server running at:`);
            console.log(`   Local:   http://localhost:${PORT}`);
            console.log(`   Network: http://${getLocalIP()}:${PORT}`);
        });
    })
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Function to get your local network IP
function getLocalIP() {
    const os = require('os');
    const interfaces = os.networkInterfaces();
    for (let iface in interfaces) {
        for (let alias of interfaces[iface]) {
            if (alias.family === 'IPv4' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return 'localhost';
}
