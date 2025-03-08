import Task from '../models/task.js';

const getTasks = async(req,res)=>{
    try {
        const { id, title, user, status } = req.body;

        let query = {}

        if(id){
            query._id = id
        }

        if(title){
            query.title = title
        }

        if(user){
            query.status = status
        }

        // Fetch data based on query (if empty, fetch all tasks)
        const tasks = await Task.find(query);
        
        res.status(200).json({ message: "Tasks retrieved successfully", tasks });
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
};

export default getTasks;