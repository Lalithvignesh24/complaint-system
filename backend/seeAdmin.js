require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // Check if an admin already exists
        const adminExists = await Admin.findOne({ email: 'admin@yourcollege.edu' });
        if (adminExists) {
            console.log('Admin user already exists.');
            mongoose.connection.close();
            return;
        }

        // Create the new admin user
        await Admin.create({
            email: 'gottakirankumar@gmail.com',
            password: 'Kiran@h', // Choose a strong password
        });

        console.log('✅ Admin user created successfully!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding admin user:', error);
        process.exit(1);
    }
};

seedAdmin();