require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const CodeBlock = require('./models/CodeBlock');

const app = express();
const PORT = process.env.PORT || 5002;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    initializeCodeBlocks();
  })
  .catch(err => console.error('Could not connect to MongoDB:', err));

const defaultCodeBlocks = [
  // Your default code blocks
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

app.get('/api/codeblocks', async (req, res) => {
  try {
    console.log('Received request for /api/codeblocks');
    const codeBlocks = await CodeBlock.find();
    res.json(codeBlocks);
  } catch (err) {
    console.error('Error fetching code blocks:', err);
    res.status(500).json({ error: 'Error fetching code blocks' });
  }
});

app.get('/api/codeblocks/:id', async (req, res) => {
  try {
    console.log(`Received request for /api/codeblocks/${req.params.id}`);
    const codeBlock = await CodeBlock.findById(req.params.id);
    res.json(codeBlock);
  } catch (err) {
    console.error('Error fetching code block:', err);
    res.status(500).json({ error: 'Error fetching code block' });
  }
});

app.post('/api/codeblocks', async (req, res) => {
  try {
    console.log('Received request to create a new code block');
    const newCodeBlock = new CodeBlock(req.body);
    const savedCodeBlock = await newCodeBlock.save();
    res.status(201).json(savedCodeBlock);
  } catch (err) {
    console.error('Error saving code block:', err);
    res.status(500).json({ error: 'Error saving code block' });
  }
});

app.put('/api/codeblocks/:id', async (req, res) => {
  try {
    console.log(`Received request to update code block with ID ${req.params.id}`);
    const updatedCodeBlock = await CodeBlock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCodeBlock);
  } catch (err) {
    console.error('Error updating code block:', err);
    res.status(500).json({ error: 'Error updating code block' });
  }
});

app.delete('/api/codeblocks/:id', async (req, res) => {
  try {
    console.log(`Received request to delete code block with ID ${req.params.id}`);
    await CodeBlock.findByIdAndDelete(req.params.id);
    res.json({ message: 'CodeBlock deleted' });
  } catch (err) {
    console.error('Error deleting code block:', err);
    res.status(500).json({ error: 'Error deleting code block' });
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

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
