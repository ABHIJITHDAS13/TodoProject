# Backend - Laravel API

## Overview
This is the backend API of the project, built using Laravel. The API allows the frontend to manage projects and todos, including the creation, editing, updating, and deletion of projects and todos. It also provides endpoints to export project summaries to GitHub as secret gists in markdown format.

## Features
- User authentication via simple login.
- CRUD operations for projects and todos.
- Export project summaries as a secret gist on GitHub.
- Supports CORS for frontend-backend communication.

## Technologies Used
- **Laravel**: PHP framework for building the backend API.
- **MySQL**: Database to store projects and todos.
- **GitHub API**: To create secret gists for project summaries.
- **JWT Authentication**: For user authentication and authorization.
- **CORS**: For handling cross-origin requests between frontend and backend.

## Prerequisites
Make sure the following are installed on your local machine:
- **PHP** (>= 8.0)
- **Composer** (Dependency manager for PHP)
- **MySQL** or **MariaDB**
- **Git** (For version control)
- **Node.js** (For frontend, if required for full-stack development)

## Setup Instructions

### 1. Clone the Repository
Clone the backend repository to your local machine:

```bash
git clone https://github.com/yourusername/project-repository-name.git
```

### 2. Install PHP Dependencies
Navigate to the backend directory and install the required PHP dependencies using Composer:

```bash
cd backend
composer install
```
### 3. Configure Environment Variables
Copy the .env.example file to .env and configure the necessary environment variables, especially for database connection and GitHub token:

```bash
cp .env.example .env
```
Update the .env file with the following values:
- **Database Configuration**: Ensure the following database settings are correctly set:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password

- **GitHub API Token**: Set your GitHub API token for creating secret gists:

### 4. Migrate Database
Run the migrations to create the necessary database tables:
```bash
php artisan migrate
```
If you want to seed some data (like sample projects and todos), you can run the seeders:
```bash
php artisan db:seed
```
### 5. Start the Development Server
Start the Laravel development server:

```bash
php artisan serve
```
The backend API will be accessible at http://localhost:8000.

### 6.Enable CORS
To allow the frontend React application to communicate with this backend, ensure that CORS is properly configured. If you are using barryvdh/laravel-cors or Laravel's built-in CORS support, ensure it is configured in config/cors.php.

### 8. Running Tests
To run the tests for the backend, use the following command:
```bash
php artisan test
```
This will run the tests defined in the tests directory.

# API Endpoints
### 1. User Authentication
- **POST /login**: Authenticate the user. Requires username and password in the request body.

### 2. Projects
- **GET /projects**: Fetch all projects.
- **POST /projects**: Create a new project. Requires title and description.
- **GET /projects/{id}**: Fetch a specific project by ID, including its todos.
- **PUT /projects/{id}**: Update the project title or description.
- **DELETE /projects/{id}**: Delete the project by ID.

### 3. Todos
- **POST /projects/{project_id}/todos**: Create a new todo in a specific project. Requires description and status.
- **GET /projects/{project_id}/todos**: Get all todos for a specific project.
- **PUT /todos/{id}**: Update a specific todo (status or description).
- **DELETE /todos/{id}**: Delete a specific todo.

### 4. Export Project Summary as Gist
- **POST /projects/{id}/export-gist**: Export the project summary (with todos) as a secret Gist to GitHub.
- **Request**: The body should include the project ID.
- **Response**: Returns a link to the created secret Gist on GitHub.


