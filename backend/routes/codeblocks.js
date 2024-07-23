//backend/routes/codeblocks.js

const express = require('express');
const router = express.Router();
const CodeBlock = require('../models/CodeBlock');

// Get all codeblocks
router.get('/', async (req, res) => {
  try {
    const codeBlocks = await CodeBlock.find();
    res.json(codeBlocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one code block by id
router.get('/:id', getCodeBlock, (req, res) => {
  res.json(res.codeBlock);
});

// Create one codeblock
router.post('/', async (req, res) => {
  const codeBlock = new CodeBlock({
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    solution: req.body.solution,
  });

  try {
    const newCodeBlock = await codeBlock.save();
    res.status(201).json(newCodeBlock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one codeblock
router.put('/:id', getCodeBlock, async (req, res) => {
  if (req.body.title != null) {
    res.codeBlock.title = req.body.title;
  }
  if (req.body.description != null) {
    res.codeBlock.description = req.body.description;
  }
  if (req.body.code != null) {
    res.codeBlock.code = req.body.code;
  }
  if (req.body.solution != null) {
    res.codeBlock.solution = req.body.solution;
  }

  try {
    const updatedCodeBlock = await res.codeBlock.save();
    res.json(updatedCodeBlock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one codeblock
router.delete('/:id', getCodeBlock, async (req, res) => {
  try {
    await res.codeBlock.remove();
    res.json({ message: 'Deleted CodeBlock' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Middleware to find CodeBlock by id and attach to response
async function getCodeBlock(req, res, next) {
  let codeBlock;
  try {
    codeBlock = await CodeBlock.findById(req.params.id);
    if (codeBlock == null) {
      return res.status(404).json({ message: 'Cannot find codeblock' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.codeBlock = codeBlock;
  next();
}

module.exports = router;
