# Fullstack Todo Application

This document provides a comprehensive overview of the full-stack todo application, including its features, architecture, and setup instructions.

## Features

-   **User Authentication:**
    -   User registration with username, email, and password.
    -   User login with email and password.
    -   Secure password hashing using bcrypt.
    -   JSON Web Token (JWT) based authentication.
-   **Todo Management:**
    -   Create new todos with title, category, priority, due date, and status.
    -   View all todos.
    -   View a specific todo by ID.
    -   Update existing todos.
    -   Update the status of a todo.
    -   Delete todos.
-   **Data Validation:**
    -   Input validation using Zod for both user and todo data.
    -   Error handling for invalid inputs.
-   **Database:**
    -   MongoDB for storing user and todo data.
    -   Mongoose for interacting with the database.
-   **Scheduled Tasks:**
    -   Cron job to automatically update the status of todos to "expired" when their due date has passed.
-   **Error Handling:**
    -   Global error handling middleware to catch and respond to errors.

## Architecture

The application follows a typical full-stack architecture with a Node.js backend and a potential frontend (not included in the provided code).

### Backend

The backend is built using Node.js with Express.js. It handles API requests, database interactions, and business logic.

-   **`app.js`**: Main entry point for the Express application.
    -   Sets up middleware for JSON parsing and routing.
    -   Defines routes for todos and users.
    -   Implements global error handling.
-   **`server.js`**: Starts the server and connects to the database.
    -   Imports the Express app and database connection logic.
    -   Starts the server on the specified port.
-   **`src/config/`**: Contains configuration files.
    -   **`db.js`**: Handles database connection using Mongoose.
    -   **`dotenv.js`**: Loads environment variables from `.env` file.
-   **`src/controllers/`**: Contains controller functions for handling requests.
    -   **`todoController.js`**: Handles todo-related operations (create, get, update, delete).
    -   **`userController.js`**: Handles user-related operations (create user).
-   **`src/middlewares/`**: Contains middleware functions.
    -   **`userMiddleware.js`**: Validates user input and handles user authentication logic.
-   **`src/models/`**: Contains Mongoose models for database schemas.
    -   **`Todo.js`**: Defines the schema for todos.
    -   **`User.js`**: Defines the schema for users.
-   **`src/routes/`**: Contains route definitions.
    -   **`todoRoutes.js`**: Defines routes for todo-related operations.
    -   **`userRoutes.js`**: Defines routes for user-related operations.
-   **`src/utils/`**: Contains utility functions.
    -   **`auth.js`**: Handles password hashing, comparison, and JWT token generation.
    -   **`cron-job.js`**: Implements a cron job to update expired todos.
    -   **`zodValidation.js`**: Implements input validation using Zod.

## Models

### User Model (`src/models/User.js`)

The `User` model represents a user in the application and has the following properties:

-   **`username`**:
    -   Type: `String`
    -   Required: `true`
    -   Unique: `true`
    -   Stores the username of the user.
-   **`email`**:
    -   Type: `String`
    -   Required: `true`
    -   Unique: `true`
    -   Stores the email address of the user.
-   **`password`**:
    -   Type: `String`
    -   Required: `true`
    -   Stores the hashed password of the user.
-   **`membership`**:
    -   Type: `String`
    -   Enum: `["silver", "gold", "diamond"]`
    -   Default: `"silver"`
    -   Stores the membership level of the user.
-   **`role`**:
    -   Type: `String`
    -   Enum: `["admin", "user"]`
    -   Default: `"user"`
    -   Stores the role of the user.
-   **`status`**:
    -   Type: `String`
    -   Enum: `["active", "suspended", "deleted"]`
    -   Default: `"active"`
    -   Stores the status of the user account.
-   **`firstName`**:
    -   Type: `String`
    -   Stores the first name of the user.
-   **`lastName`**:
    -   Type: `String`
    -   Stores the last name of the user.
-   **`avatar`**:
    -   Type: `String`
    -   Stores the URL of the user's avatar.
-   **`isEmailVerified`**:
    -   Type: `Boolean`
    -   Default: `false`
    -   Indicates whether the user's email is verified.
-   **`todos`**:
    -   Type: `Array` of `ObjectId` referencing `Todo` model
    -   Stores the list of todos associated with the user.
-   **`timestamps`**:
    -   Automatically adds `createdAt` and `updatedAt` fields.

The model also includes a pre-save hook to set the membership level dynamically based on the user's role.

### Todo Model (`src/models/Todo.js`)

The `Todo` model represents a todo item and has the following properties:

-   **`title`**:
    -   Type: `String`
    -   Required: `true`
    -   Stores the title of the todo.
-   **`category`**:
    -   Type: `String`
    -   Enum: `["Personal", "Work", "Other"]`
    -   Default: `"Personal"`
    -   Required: `true`
    -   Stores the category of the todo.
-   **`priority`**:
    -   Type: `String`
    -   Enum: `["high", "normal", "low"]`
    -   Required: `true`
    -   Stores the priority of the todo.
-   **`dueDate`**:
    -   Type: `Date`
    -   Default: 7 days from the current date
    -   Required: `true`
    -   Stores the due date of the todo.
-   **`status`**:
    -   Type: `String`
    -   Enum: `["pending", "completed", "expired"]`
    -   Default: `"pending"`
    -   Required: `true`
    -   Stores the status of the todo.
-   **`timestamps`**:
    -   Automatically adds `createdAt` and `updatedAt` fields.

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    -   Create a `.env` file in the `backend` directory.
    -   Add the following environment variables:
        ```env
        MONGO_URI=<your-mongodb-connection-string>
        JWT_SECRET=<your-jwt-secret>
        PORT=<port-number>
        HASH_SALT_ROUNDS=<number-of-salt-rounds>
        ```
        Replace the placeholders with your actual values.
4.  **Start the server:**
    ```bash
    node backend/server.js
    ```
    The server will start on the specified port.

## API Endpoints

### Todo Routes

-   **`GET /api/todos`**: Get all todos.
-   **`GET /api/todos/:todoId`**: Get a specific todo by ID.
-   **`POST /api/todos`**: Create a new todo.
    -   Request body:
        ```json
        {
            "title": "string",
            "category": "Personal" | "Work" | "Other",
            "priority": "high" | "normal" | "low",
            "dueDate": "date string",
            "status": "pending" | "completed" | "expired"
        }
        ```
-   **`PUT /api/todos/:todoId`**: Update an existing todo.
    -   Request body:
        ```json
        {
            "title": "string",
            "category": "Personal" | "Work" | "Other",
            "priority": "high" | "normal" | "low",
            "dueDate": "date string",
            "status": "pending" | "completed" | "expired"
        }
        ```
-   **`PUT /api/todos/status/:todoId`**: Update the status of a todo.
    -   Request body:
        ```json
        {
            "status": "pending" | "completed" | "expired"
        }
        ```
-   **`DELETE /api/todos/:todoId`**: Delete a todo.

### User Routes

-   **`POST /api/user/signup`**: Register a new user.
    -   Request body:
        ```json
        {
            "username": "string",
            "email": "string",
            "password": "string"
        }
        ```
-   **`POST /api/user/signin`**: Login an existing user.
    -   Request body:
        ```json
        {
            "username": "string",
            "email": "string",
            "password": "string"
        }
        ```
