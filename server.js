import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import registerUser from './services/register.js';
import loginUser from './services/login.js';
import deleteUser from './services/deleteUser.js';
import updateUser from './services/updateUser.js';
import createTask from './services/createTask.js';
import getTasks from './services/fetchTask.js';
import updateTask from './services/updateTask.js'
import deleteTask from './services/deleteTask.js';
dotenv.config();

const app = express();
app.use(cors()); 

const PORT = process.env.PORT || 5000;

// connect DB
connectDB()
  .then(() => console.log('Database connected successfully'))
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

// Middleware to parse JSON request bodies
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Routes
app.post('/api/register', registerUser);
app.post('/api/login', loginUser);
app.post('/api/deleteUser', deleteUser);
app.post('/api/updateUser',updateUser);
app.post('/api/createTask',createTask);
app.post('/api/queryTask',getTasks);
app.post('/api/updateTask',updateTask);
app.post('/api/deletedTask', deleteTask)

// Start the server
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});