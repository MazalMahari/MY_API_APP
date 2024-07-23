//backend/models/CodeBlock.js

const mongoose = require('mongoose');

const codeBlockSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  solution: { type: String, required: true },
});

module.exports = mongoose.model('CodeBlock', codeBlockSchema);
