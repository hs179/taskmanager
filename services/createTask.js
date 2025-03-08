import express from 'express';
import Task from '../models/task.js';

const createTask = async(req, res)=>{
    try {
        const {title, description, dueDate, user} = req.body;
        const task = new Task({
            title,
            description,
            dueDate,
            user
        });

        await task.save();
        console.log("Task saved:", task);
        res.status(201).json({message:"Task Created successfully", task})
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error: error.message });
    }
}

export default createTask;