const Todo = require('../model/todoModel.js');

// CREATE: Insert a new todo
async function createTodo(todoData) {
    
    const todo = new Todo(todoData);
    const result = await todo.save();
    return result;
}

// READ: Get all todos
async function getTodos() {
    
    const todos = await Todo.find();
    return todos;
}

// UPDATE: Update a todo by id
async function updateTodo(id, updatedTodo) {
    console.log(id)
    const result = await Todo.findByIdAndUpdate(id, updatedTodo, { new: true });
    return result;
}

// DELETE: Delete a todo by id
async function deleteTodo(id) {
    const result = await Todo.findByIdAndDelete(id);
    return result;
}

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
};