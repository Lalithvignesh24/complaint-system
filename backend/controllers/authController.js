const User = require('../models/Admin'); // Make sure you import your User model
const bcrypt = require('bcryptjs');     // Import bcrypt for password comparison
const jwt = require('jsonwebtoken');  // Import jwt for token creation

// Example in backend/controllers/authController.js

exports.loginAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Log 1: Check if the backend is receiving the correct email
      console.log('Login attempt for email:', email);
  
      // Find the user in the database
      const user = await User.findOne({ email });
  
      // Log 2: Check if a user was found
      if (!user) {
        console.log('RESULT: User not found in database.');
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      console.log('RESULT: User found:', user.email);
  
      // Log 3: Check if the password comparison is successful
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('RESULT: Password does NOT match.');
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      console.log('RESULT: Password matches!');
      
      // ... If successful, proceed to create and send the JWT token ...
  
    } catch (error) {
      console.error('SERVER CRASH during login:', error);
      res.status(500).send('Server error');
    }
  };