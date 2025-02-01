const express = require('express');
const app = express();
let tasks = [
    { id: 1, title: 'Learn Node.js', completed: false },
    { id: 2, title: 'Build Task Manager API', completed: false }
];


app.use(express.json()); // Middleware to parse JSON
// Sample API Route
app.get('/', (req, res) => {
    res.send('Welcome to Task Manager API!');
});

app.post('/tasks',(req, res)=>{
    const { title, completed } = req.body;
    if (!title) {
        return res.status(400).send('Title is required');  // Validation
    }

    const newTask = {
        id: tasks.length + 1,  // Auto increment ID
        title,
        completed: completed || false,  // Default to false if not provided
    };
    tasks.push(newTask);  // Add task to the array
    res.status(201).json(newTask);
});

app.get("/tasks",(req , res)=>{
    res.json(tasks);
});

app.get("/tasks/:id",(req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).send('Task not found');  // Handle if task doesn't exist
    }
    res.json(task);
});

app.put("/tasks/:id",(req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).send('Task not found');  // Handle if task doesn't exist
    }

    const { title, completed } = req.body;  // Get new data from request body
    if (title) task.title = title;
    if (completed !== undefined) task.completed = completed; 
    res.json(task);  
})

app.delete("/tasks/:id",(req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    console.log(taskIndex);
    if (!taskIndex) {
        return res.status(404).send('Task not found');  // Handle if task doesn't exist
    }
    tasks.splice(taskIndex, 1);  // Remove the task from the array
    res.status(204).send();
})

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});