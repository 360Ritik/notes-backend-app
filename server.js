const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectDB = require('./database/connect');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());

app.use(cors());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 12 * 60 * 60 * 1000 // 12 hours in milliseconds
  }
}));
// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
