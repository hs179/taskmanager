import Task from '../models/task.js'

const deleteTask = async(req, res) =>{
    try {
        const {taskId}= req.body;
        const taskid = await Task.findOne({taskId});
        if(!taskid){
            res.status(404).json({message:"Invalid Task ID"})
        }

         //  deletedUser from DB
         const deleteTask = await Task.findOneAndDelete({taskId})
         if(!deleteTask){
            return  res.status(400).json({message:"Internal Error"})
          }else{
            return  res.status(200).json({message:"Task Delete Successfully!!!!"})
          }
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"});
        
    }
}

export default deleteTask;