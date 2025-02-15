# Project Name

## Overview

Server for a task management system that allows users to create, retrieve, update, and delete tasks. The application follows a RESTful API architecture and uses MongoDB as the database. It is built using Node.js and Express.

## Features

- User authentication and authorization
- Task creation, retrieval, update, and deletion
- Secure API with JWT authentication
- Data validation and error handling

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT Authentication
- Async/Await with error handling middleware

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB installed and running locally or a MongoDB Atlas account

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/saisankar-1919/task-mind-server
   cd task-mind-server
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:

   ```env
   MONGO_URI = <your mongoDB connection string>
   PORT = <network port>
   JWT_SECRET=<jwt secret>
   ```

4. Start the server:

   ```sh
   npm run dev
   ```
