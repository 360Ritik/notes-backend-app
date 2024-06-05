const Note = require('../models/note');

const formatDate = (date) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options);
};

exports.addNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const formattedDate = formatDate(Date.now()); // Format current date
    const note = new Note({ title, content, userId: req.session.userId, dateCreated: formattedDate });
    await note.save();
    res.status(201).send('Note added successfully');
  } catch (err) {
    res.status(400).send(err);
  }
};
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.session.userId }).select('-_id title content dateCreated');
    res.send(notes);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { note_id: req.params.id, userId: req.session.userId },
      req.body,
      { new: true }
    ).select('title content dateCreated');
    if (!note) return res.status(404).send('Note not found');
    res.json(note);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ note_id: req.params.id, userId: req.session.userId });
    if (!note) return res.status(404).send('Note not found');
    res.send('Note deleted');
  } catch (err) {
    res.status(400).send(err);
  }
};
