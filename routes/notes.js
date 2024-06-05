const express = require('express');
const { addNote, getNotes, updateNote, deleteNote } = require('../controllers/notes');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .post(protect, addNote)
  .get(protect, getNotes);

router.route('/:id')
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;
