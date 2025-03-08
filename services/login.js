import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config();

const loginUser = async(req,res) => {
    try {
        const {email,password} = req.body;
        
        // check if user exist
        const user = await User.findOne({email});
        if (!user) {
            res.status(400).json({message:"Invalid email or password"})
        }

         // Compare hashed password
         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
             return res.status(400).json({ message: "Invalid email or password" });
         }


         // Generate JWT token
         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h" 
        });

        res.status(200).json({ message: "Login successful",Loginflag:"true", token })

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
}

export default loginUser;