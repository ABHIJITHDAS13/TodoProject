# Frontend - React Application

## Overview
This is the frontend of the project, built using React.js. The application allows users to manage projects and todos. Users can create and manage projects, add/edit/delete todos, and mark todos as complete or pending. It also provides the ability to export project summaries to GitHub as a secret gist in markdown format.

## Features
- Create, edit, and delete projects.
- Add, edit, update, and delete todos within a project.
- Mark todos as complete or pending.
- Export project summary as a secret Gist to GitHub.
- Simple authentication mechanism to protect the project pages.

## Technologies Used
- **React**: JavaScript framework for building the user interface.
- **Axios**: For making HTTP requests to the backend API.
- **GitHub Gist API**: To export project summaries as secret gists.
- **CSS**: For basic styling.

## Prerequisites
Ensure the following are installed on your local machine:
- **Node.js**: Required for running the application.
- **npm (Node Package Manager)**: To install dependencies.
- **GitHub Token**: For interacting with GitHub’s API to create secret gists.

## Setup Instructions

### 1. Clone the repository
Clone the repository to your local machine using Git:

``` bash
git clone https://github.com/yourusername/project-repository-name.git
```
### 2. Install Node.js dependencies
Navigate to the frontend directory and install the required Node.js dependencies:

``` bash
cd frontend
npm install
```
### 3. Configure Environment Variables
Create a .env file in the frontend directory (if it doesn’t already exist) and configure the following environment variables:

``` bash
REACT_APP_API_URL=http://localhost:8000/api   # URL of your Laravel backend API
REACT_APP_GITHUB_TOKEN=your_github_token    # Your GitHub token with gist permissions
```

Make sure to replace your_github_token with your actual GitHub token that has the appropriate permissions for creating gists.

### 4. Start the Development Server
Once the dependencies are installed and environment variables are configured, start the React development server:

``` bash
npm start
```
The frontend will now be available at http://localhost:3000.

### 5. Running Tests
To run the tests for the React frontend, use the following command:

``` bash
npm test
```

This will run the Jest testing framework to execute tests defined in the src/__tests__ directory.

## Using the Application
1.**Login**: On the login page, enter the credentials and authenticate yourself.
2.**Home Page**: View the list of projects. You can click "View" to manage a project’s todos.
3.**Managing Todos**: Add new todos, edit their descriptions, mark them as completed or pending, and delete them.
4.**Export Project Summary**: Once in the project view, click the “Export as Gist” button to create a markdown file of the project summary, which will be uploaded as a secret gist on GitHub.

## Exporting Project Summary as Gist
When a user clicks the Export as Gist button, the following markdown format will be generated:

 ### Format:
- **File Name**: <Project Title>.md
- **Content**:
- **Heading**: Project Title.
- **Summary**: X / Y completed (X = number of completed todos, Y = total number of todos).
- **Section 1**: List of pending todos (with open checkboxes).
- **Section 2**: List of completed todos (with checked checkboxes).

### Example Gist Content:

# Project Title

**Summary**: 3 / 5 completed.

## Pending Todos
- [ ] Todo 1 description
- [ ] Todo 2 description

## Completed Todos
- [x] Todo 3 description
- [x] Todo 4 description
