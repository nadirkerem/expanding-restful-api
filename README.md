# Expanding RESTful API Lab

## Overview

This project is part of the Per Scholas Software Engineering Program, focusing on expanding RESTful API capabilities using Express.js. It demonstrates advanced API features like routing, middleware integration, and robust error handling.

## Features

- **Structured Routing**: Organizes API routes into separate modules for users, posts, and comments, making the API easier to maintain and scale.
- **API Key Authentication**: Includes middleware that validates API keys before allowing access to the API endpoints.
- **Error Handling**: Implements centralized error handling to manage different types of API errors efficiently.
- **HATEOAS**: Incorporates Hypermedia as the Engine of Application State principles to make the API more discoverable.

## Technologies Used

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: Web application framework for Node.js, designed for building web applications and APIs.
- **Body-Parser**: Middleware to handle post data in Express.

## Installation

To get this project up and running on your local machine, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```
   Access the server at http://localhost:3000.

## API Endpoints

- **User Posts**:

  - `GET /api/users/:id/posts`: Retrieves all posts by a user.
  - `GET /api/posts?userId=<VALUE>`: Fetches posts filtered by user ID, demonstrating an alternate method of filtering.

- **Comments**:

  - `GET /comments`: Fetches all comments (initial setup may not have data).
  - `POST /comments`: Adds a new comment with fields for user ID, post ID, and comment body.
  - `GET /comments/:id`, `PATCH /comments/:id`, `DELETE /comments/:id`: Manages specific comments by ID.
  - `GET /comments?userId=<VALUE>` and `GET /comments?postId=<VALUE>`: Filters comments by user or post.

- **Comments on Posts**:

  - `GET /posts/:id/comments`: Retrieves comments for a specific post.
  - `GET /posts/:id/comments?userId=<VALUE>`: Filters comments on a post by a specific user.

- **User Comments**:
  - `GET /users/:id/comments`: Gets comments made by a specific user.
  - `GET /users/:id/comments?postId=<VALUE>`: Filters comments made by a user on a specific post.
