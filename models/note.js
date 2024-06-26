const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const noteSchema = new mongoose.Schema({
  note_id: {
    type: String,
    default: uuidv4,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  dateCreated: {
    type: String, // Change type to String
    required: true // Ensure dateCreated is required
  },
  userId: {
    type: String,
    required: true
  }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
