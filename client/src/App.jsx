import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  // State for notes and form inputs
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  // Fetch notes when component mounts
  useEffect(() => {
    fetchNotes();
  }, []); // Empty dependency array to run only once on mount

  // Function to fetch all notes from the server
  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/notes");
      setNotes(res.data.note); // Store the notes in state
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Function to create a new note
  const createNote = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      // Send POST request with title and description
      const res = await axios.post("http://localhost:5000/notes", {
        title,
        desc,
      });

      // Add the new note to the notes array
      setNotes([...notes, res.data.note]);

      // Clear the form
      setTitle("");
      setDesc("");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  // Function to handle edit button click
  const handleEdit = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setDesc(note.desc);
  };

  // Function to update a note
  const updateNote = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/notes/${editingNote._id}`,
        {
          title,
          desc,
        }
      );

      // Update the notes array with the edited note
      const updatedNotes = notes.map((note) =>
        note._id === editingNote._id ? res.data.note : note
      );
      setNotes(updatedNotes);

      // Clear form and editing state
      setTitle("");
      setDesc("");
      setEditingNote(null);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Function to delete a note
  const deleteNote = async (note) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${note._id}`);
      
      // Remove the deleted note from the state
      const updatedNotes = notes.filter((n) => n._id !== note._id);
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div>
      <h1>My Notes</h1>

      <div>
        {notes.map((note) => (
          <div key={note._id}>
            <h2>{note.title}</h2>
            <p>{note.desc}</p>
            <div>
              <button onClick={() => handleEdit(note)}>Edit</button>
              <button onClick={() => deleteNote(note)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Note Form */}
      <div>
        <h2>{editingNote ? "Edit Note" : "Create New Note"}</h2>
        <form onSubmit={editingNote ? updateNote : createNote}>
          <div>
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <textarea
              placeholder="Enter Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows="4"
            />
          </div>
          <button type="submit">
            {editingNote ? "Update Note" : "Create Note"}
          </button>
          {editingNote && (
            <button
              type="button"
              onClick={() => {
                setEditingNote(null);
                setTitle("");
                setDesc("");
              }}
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default App;
