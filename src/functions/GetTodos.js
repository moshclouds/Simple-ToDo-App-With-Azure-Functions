const { app } = require('@azure/functions');
const { getTodos } = require('../service/todoService.js');
const { connectToDatabase } = require('../config/mongodb.js');

app.http('get-todos-function', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);
        await connectToDatabase();

        try {
            const todos = await getTodos();
            return {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    timestamp: new Date().toISOString(),
                    status: 200,
                    message: 'To-Do List Retrieved Successfully',
                    code: 'SUCCESS',
                    data: todos,
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
