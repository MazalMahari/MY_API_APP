// backend/server.js
const express = require('express');
const CodeBlock = require('./models/CodeBlock.js');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5002;
const server = http.createServer(app);
const io = socketIo(server);

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';
app.use(cors());
app.use(express.json());

mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB');
  initializeCodeBlocks();
}).catch(err => console.error('Could not connect to MongoDB:', err));

// set of default exercises
const defaultCodeBlocks = [
  {
    title: 'Exercise 1',
    description: 'Async case',
    code: 'async function fetchData()',
    solution: 'async function fetchData() {\n  const response = await fetch("/data");\n  const data = await response.json();\n  console.log(data);\n}',
  },
  {
    title: 'Exercise 2',
    description: 'Promise case',
    code: 'Promise case: function fetchData() ',
    solution: 'function fetchData() {\n  fetch("/data")\n    .then(response => response.json())\n    .then(data => console.log(data));\n}',
  },
  {
    title: 'Exercise 3',
    description: 'Callback case',
    code: 'function fetchData(callback) {\n}',
    solution: 'function fetchData(callback) {\n  fetch("/data")\n    .then(response => response.json())\n    .then(data => callback(data));\n}',
  },
  {
    title: 'Exercise 4',
    description: 'Print Hello World',
    code: 'console.log();',
    solution: 'console.log("Hello World!");',
  },
];

async function initializeCodeBlocks() {
  try {
    const count = await CodeBlock.countDocuments();
    if (count === 0) {
      await CodeBlock.insertMany(defaultCodeBlocks);
      console.log('Default code blocks have been added to the database');
    } else {
      console.log('Code blocks already exist in the database');
    }
  } catch (err) {
    console.error('Error initializing code blocks:', err);
  }
}

// defining API routes
app.get('/api/codeblocks', async (req, res) => {
  try {
    const codeBlocks = await CodeBlock.find();
    res.json(codeBlocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/codeblocks/:id', async (req, res) => {
  try {
    const codeBlock = await CodeBlock.findById(req.params.id);
    res.json(codeBlock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/codeblocks', async (req, res) => {
  try {
    const newCodeBlock = new CodeBlock(req.body);
    const savedCodeBlock = await newCodeBlock.save();
    res.status(201).json(savedCodeBlock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/codeblocks/:id', async (req, res) => {
  try {
    const updatedCodeBlock = await CodeBlock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCodeBlock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/codeblocks/:id', async (req, res) => {
  try {
    await CodeBlock.findByIdAndDelete(req.params.id);
    res.json({ message: 'CodeBlock deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('message', (data) => {
    console.log('Message received:', data);
    socket.emit('response', 'Message received');
  });

  socket.emit('welcome', 'Welcome to the server!');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
