//Import env
require("dotenv").config();

//Import ConnectDB
const connectDB = require("./connectDB");

const express = require("express");
const app = express();
app.use(express.json());
const notesController = require("./notes.controllers");

connectDB();

//Create a note
app.post("/notes", notesController.createNote);

//Find all notes
app.get("/notes", notesController.fetchAllNotes);

//Find a single note
app.get("/notes/:id", notesController.fetchSingleNote);

//Updating the note
app.put("/notes/:id", notesController.updateNote);

app.delete("/notes/:id", notesController.deleteNote);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
