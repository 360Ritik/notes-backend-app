# Notes Backend App

## Overview
This repository contains the backend code for a notes application. It provides APIs for creating, reading, updating, and deleting notes.

[Watch API Demonstration Video] [notes-backend-app.webm](https://github.com/360Ritik/notes-backend-app/assets/93071300/b076edba-9254-4824-93b5-ff4f87349885)


## Setup

### Prerequisites
- Node.js installed on your machine
- MongoDB installed and running

### Installation
1. Clone the repository: 
   ```bash
   git clone https://github.com/your-username/notes-backend.git
2. Navigate to the project directory:
   - cd notes-backend
3.  Install dependencies
   - npm install
    
### Configuration
- Replace the placeholder values in database/connect.js with your MongoDB username and password.
  
- Starting the Server
To start the server, run:
   npm start
The server will start on port 3000 by default. You can change the port in server.js or .env file.

## API Endpoints

### Authentication
- POST /api/auth/login: Log in with username and password to obtain a session token.
- POST /api/auth/logout: Log out and invalidate the session token.

### Notes
- GET /api/notes: Get all notes.
- GET /api/notes/
: Get a specific note by ID.
- POST /api/notes: Create a new note.
- PUT /api/notes/
: Update a note by ID.
- DELETE /api/notes/
: Delete a note by ID.


Session-Based Authentication
This backend uses session-based authentication. After logging in, the server will create a session for the user and return a session token. This token should be included in subsequent requests as a cookie or in the Authorization header to authenticate the user.

Contributors
Ritik Kumar


   




    
    
   
