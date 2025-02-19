const { app } = require('@azure/functions');
const { deleteTodo } = require('../service/todoService.js');
const { connectToDatabase } = require('../config/mongodb.js');

app.http('delete-todo-function', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);
        await connectToDatabase();

        try {
            const id = request.query.id;
            const result = await deleteTodo(id);

            if (!result) {
                return {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        timestamp: new Date().toISOString(),
                        status: 404,
                        message: 'To-Do Not Found',
                        code: 'NOT_FOUND',
                    }),
                };
            }

            return {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    timestamp: new Date().toISOString(),
                    status: 200,
                    message: 'To-Do Deleted Successfully',
                    code: 'DELETED',
                    data: result,
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