import User from "../models/user.js";

const updateUser = async(req,res)=>{
    try {
        const {name,phone,email} = req.body;
        // check if user present in db
        const userPresent = await User.findOne({email});
        if(!userPresent){
            return  res.status(400).json({message:"Invalid email"})
        }
        // update user in connectDB 
        const updatedUser = await User.findOneAndUpdate(
            {email},
            {$set:{name, phone}},
            {new:true}
        );
        return res.status(200).json({
            success:true, 
            message:"User updated Successfully!!!", 
            user:updatedUser
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export default updateUser;