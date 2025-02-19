
# Simple Azure Functions To-Do App

This repository contains an Azure Functions application that performs CRUD operations for a To-Do list. The app is backed by MongoDB and deployed to Azure.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setup Instructions](#setup-instructions)
3. [How to Run Locally](#how-to-run-locally)
4. [Postman API Requests](#postman-api-requests)
5. [Azure CLI Deployment](#azure-cli-deployment)
6. [Response Samples](#response-samples)

## Prerequisites
1. [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)
2. [MongoDB Account](https://www.mongodb.com/cloud/atlas)
3. [Node.js](https://nodejs.org/)
4. [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local)

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:
   ```
   MONGODB_URI=<your_mongodb_connection_string>
   ```

4. Install Azure Functions Core Tools if not already installed:
   ```bash
   npm install -g azure-functions-core-tools@3 --unsafe-perm true
   ```

## How to Run Locally
1. Start the Azure Functions app locally:
   ```bash
   func start
   ```

2. This will start the server on `http://localhost:7071`. You can make requests to the API endpoints as described in the next section.

## Azure Functions Used

Below are the API request types and sample URLs:

| **AZ Function**            | **URL**                                | **Request Type** | **Description**                              |
|-------------------------|----------------------------------------|------------------|----------------------------------------------|
| **Create Todo**          | `https://noob-functions.azurewebsites.net/api/create-todo-function`                      | `POST`           | Creates a new To-Do entry.                   |
| **Get Todos**            | `https://noob-functions.azurewebsites.net/api/get-todos-function`                       | `GET`            | Retrieves all To-Do entries.                 |
| **Update Todo**          | `https://noob-functions.azurewebsites.net/api/update-todo-function?id=67b5bc9238c337c4de6f9bfa`                  | `PUT`            | Updates a specific To-Do entry by ID.        |
| **Delete Todo**          | `https://noob-functions.azurewebsites.net/api/delete-todo-function?id=67b5bc9238c337c4de6f9bfa`               | `DELETE`         | Deletes a specific To-Do entry by ID.        |


## Postman API Requests
### 1. **Create To-Do (POST)**
   - URL: `http://localhost:7071/api/todo-function`
   - Method: POST
   - Body:
     ```json
     {
       "title": "Learn Azure Functions",
       "description": "Learn how to deploy and use Azure Functions"
     }
     ```
   - Response:
     ```json
     {
       "timestamp": "2025-02-19T00:00:00.000Z",
       "status": "success",
       "message": "To-Do Created",
       "code": 201,
       "todoId": "<generated_todo_id>"
     }
     ```

### 2. **Get All To-Dos (GET)**
   - URL: `http://localhost:7071/api/todo-function`
   - Method: GET
   - Response:
     ```json
     [
       {
         "todoId": "<todo_id>",
         "title": "Learn Azure Functions",
         "description": "Learn how to deploy and use Azure Functions",
         "timestamp": "2025-02-19T00:00:00.000Z"
       }
     ]
     ```

### 3. **Update To-Do (PUT)**
   - URL: `http://localhost:7071/api/todo-function/<todo_id>`
   - Method: PUT
   - Body:
     ```json
     {
       "title": "Learn Azure Functions - Updated",
       "description": "Updated the description"
     }
     ```
   - Response:
     ```json
     {
       "timestamp": "2025-02-19T00:00:00.000Z",
       "status": "success",
       "message": "To-Do Updated",
       "code": 200
     }
     ```

### 4. **Delete To-Do (DELETE)**
   - URL: `http://localhost:7071/api/todo-function/<todo_id>`
   - Method: DELETE
   - Response:
     ```json
     {
       "timestamp": "2025-02-19T00:00:00.000Z",
       "status": "success",
       "message": "To-Do Deleted",
       "code": 200
     }
     ```

## Azure CLI Deployment
### 1. **Install Azure CLI**
   [Install Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)

### 2. **Login to Azure**
   ```bash
   az login
   ```

### 3. **Create Resource Group**
   ```bash
   az group create --name <ResourceGroupName> --location <Region>
   ```

### 4. **Create Function App**
   ```bash
   az functionapp create      --resource-group <ResourceGroupName>      --consumption-plan-location <Region>      --runtime node      --runtime-version 14      --functions-version 3      --name <FunctionAppName>      --storage-account <StorageAccountName>
   ```

### 5. **Publish the Function App**
   Navigate to your project folder and deploy the app:
   ```bash
   func azure functionapp publish <FunctionAppName>
   ```

### 6. **Done!**
   Your Azure Functions app should now be live. You can access it via the URL:
   ```
   https://<FunctionAppName>.azurewebsites.net
   ```

## Response Samples
### Sample Success Response:
```json
{
  "timestamp": "2025-02-19T00:00:00.000Z",
  "status": "success",
  "message": "To-Do Created",
  "code": 201,
  "todoId": "<generated_todo_id>"
}
```

### Sample Error Response:
```json
{
  "timestamp": "2025-02-19T00:00:00.000Z",
  "status": "error",
  "message": "To-Do Not Found",
  "code": 404
}
```
## Creating A Simple HTTP Trigger Azure Function (Alternative Learning)
### 1. **Install Azure CLI**
   [Install Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)

### 2. **Login to Azure**
   ```bash
   az login
   ```

### 3. **Create Resource Group**
   ```bash
   az group create --name <ResourceGroupName> --location <Region>
   ```

### 4. **Create Function App**
   ```bash
   az functionapp create  --resource-group <ResourceGroupName> --consumption-plan-location <Region> --runtime node --runtime-version 20 --functions-version 4 --name <FunctionAppName>
   ```


### 5. **Create an Azure Functions Project**
   Run the following command to create a new Azure Functions project:
   ```bash
   func init myAzureFunctionApp --worker-runtime node
   ```

### 6. **Create a New HTTP-Triggered Function**
   Generate an HTTP function:
   ```bash
   func new --name myHttpFunction --template "HTTP trigger" --authlevel "anonymous"
   ```

### 7. **Publish the Function App**
   Navigate to your project folder and deploy the app:
   ```bash
   func azure functionapp publish <FunctionAppName>
   ```