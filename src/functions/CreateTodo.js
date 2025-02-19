const { app } = require('@azure/functions');
const { createTodo } = require('../service/todoService.js');
const { connectToDatabase } = require('../config/mongodb.js');

app.http('create-todo-function', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);
        await connectToDatabase();

        try {
            const todo = await request.json();
            const result = await createTodo(todo);
            return {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    timestamp: new Date().toISOString(),
                    status: 201,
                    message: 'To-Do Created Successfully',
                    code: 'CREATED',
                    data: { todoId: result._id },
                }),
            };
        } catch (error) {
            return {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    timestamp: new Date().toISOString(),
                    status: 500,
                    message: 'Internal Server Error',
                    code: 'ERROR',
                    error: error.message,
                }),
            };
        }
    },
});
