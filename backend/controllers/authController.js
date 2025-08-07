const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d', // Token expires in 1 day
    });
};
<<<<<<< HEAD
<div>
    <p>hi</p>
</div>
=======
>>>>>>> 12b1b9f21a52117b3e85ba00487a10805b53e613

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (admin && (await admin.matchPassword(password))) {
            res.json({
                _id: admin._id,
                email: admin.email,
                token: generateToken(admin._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};//hi
<<<<<<< HEAD
//hi mowaaa
=======
// backend/controllers/authController.js
>>>>>>> 12b1b9f21a52117b3e85ba00487a10805b53e613
