//Import env
require("dotenv").config();

//Import ConnectDB
const connectDB = require("./connectDB");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const notesController = require("./notes.controllers");
const userController = require("./user.controller");
const requireAuth = require("./requireAuth.middleware");
connectDB();

//Sing Up User
app.post("/signup", userController.signup);

//Login User
app.post("/login", userController.login);

//Logout User
app.get("/logout", userController.logout);

//Check if logged In
app.get("/check-auth", requireAuth, userController.checkAuth);

//Create a note
app.post("/notes", notesController.createNote);

//Find all notes
app.get("/notes", notesController.fetchAllNotes);

//Find a single note
app.get("/notes/:id", notesController.fetchSingleNote);

//Updating the note
app.put("/notes/:id", notesController.updateNote);

//Deleting Notes
app.delete("/notes/:id", notesController.deleteNote);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
