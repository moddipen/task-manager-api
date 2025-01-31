const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON
// Sample API Route
app.get('/', (req, res) => {
    res.send('Welcome to Task Manager API!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});