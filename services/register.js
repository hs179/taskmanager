// https://chatgpt.com/share/67b62371-c388-800e-b1bc-dcaf0e2faa5a
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

// Function to register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone
        });

        // Save user to the database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default registerUser;
