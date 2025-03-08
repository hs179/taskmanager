import Task from '../models/task.js'; 

const updateTask = async(req,res) =>{
    try {
        const {title,description,dueDate,user,taskId} = req.body;
        
        // check if the taskid avaiable

        const taskid = await Task.findOne({taskId});
        if(!taskid){
            res.status(404).json({message:"Invalid Task ID"})
        }

        // update task
        const updatedTask = await Task.findOneAndUpdate(
            {taskId},
            {$set:{title, description, dueDate, user}}
        )

        return res.status(200).json({
            success:true, 
            message:"Task Updated Successfully!!!", 
            user:updatedTask
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export default updateTask;