const Note = require("./notes.model.js");

//Create a note
const createNote = async (req, res) => {
  //get data from req
  const title = req.body.title;
  const desc = req.body.desc;

  //create a note
  const note = await Note.create({ title, desc });

  //send json
  res.json({ note });
};

//Find all notes
const fetchAllNotes = async (req, res) => {
  const note = await Note.find();
  res.json({ note });
};

//Find a single note
const fetchSingleNote = async (req, res) => {
  //get the id from the params
  const noteID = req.params.id;
  //find the note
  const note = await Note.findById(noteID);

  //respond with the note
  res.json({ note });
};

//Updating the note
const updateNote = async (req, res) => {
  const noteID = req.params.id;

  //get the id
  const { title, desc } = req.body;

  //find the note and update
  await Note.findByIdAndUpdate(noteID, {
    title,
    desc,
  });

  const note = await Note.findById(noteID);

  //respond with the new note
  res.json({ note });
};

const deleteNote = async (req, res) => {
  const noteID = req.params.id;
  await Note.findByIdAndDelete(noteID);

  res.json({ msg: "Success in Deletion" }).status(200);
};

module.exports = {
  createNote,
  fetchAllNotes,
  fetchSingleNote,
  updateNote,
  deleteNote,
};
