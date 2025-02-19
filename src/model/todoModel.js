const mongoose = require('mongoose');

// Define a schema for To-Do items
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

// Create a model based on the schema
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;