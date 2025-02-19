const { app } = require('@azure/functions');
const { getTodoById } = require('../service/todoService.js');
const { connectToDatabase } = require('../config/mongodb.js');

app.http('get-todo-function', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const { id } = request.params; // Extracting the todo ID from the URL path

        context.log(`Http function processed request for URL "${request.url}" with ID: ${id}`);
        await connectToDatabase();

        try {
            const todo = await getTodoById(id);

            if (!todo) {
                return {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        timestamp: new Date().toISOString(),
                        status: 404,
                        message: 'To-Do Not Found',
                        code: 'ERROR',
                    }),
                };
            }

            return {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    timestamp: new Date().toISOString(),
                    status: 200,
                    message: 'To-Do Retrieved Successfully',
                    code: 'SUCCESS',
                    data: todo,
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
