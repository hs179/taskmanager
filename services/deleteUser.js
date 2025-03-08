import User from "../models/user.js";

const deleteUser = async(req,res) =>{
    try {
        const{email} = req.body;
    // check if user present in database
    const userPresent = await User.findOne({email});
    if(!userPresent){
      return  res.status(400).json({message:"Invalid email"})
    }
    //  deletedUser from DB
    const deletedUser = await User.findOneAndDelete({email})
    if(!deletedUser){
      return  res.status(400).json({message:"Internal Error"})
    }else{
      return  res.status(200).json({message:"User Delete Successfully!!!!"})
    }
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export default deleteUser;