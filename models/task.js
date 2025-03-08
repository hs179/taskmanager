import mongoose from 'mongoose';
import { nanoid } from 'nanoid/non-secure';

const taskSchema = new mongoose.Schema({
    taskId: { 
        type: String, 
        unique: true, 
        default: () => nanoid(10)  // ✅ Auto-generates a unique taskId
    },
    title: {
        type: String,
        required: [true, 'Task is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    dueDate: {
        type: Date
    },
    user: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;  // ✅ Ensure it’s a default export
