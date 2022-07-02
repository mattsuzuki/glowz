import { useState, useEffect } from "react";
import axios from "axios";
import notesStore  from "../stores/notesStore";

function App() {
  const store = notesStore();

  // State
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    body: "",
  });

  //Use Effect
  useEffect(() => {
    store.fetchNotes();
  }, []);

  //Functions
  const fetchNotes = async () => {
    //Fetch the notes
    const res = await axios.get("https://mjs-server.herokuapp.com/notes");
    // Set to state
    setNotes(res.data.notes);
  };

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;

    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  const createNote = async (e) => {
    e.preventDefault();
    //Create the note
    const res = await axios.post("https://mjs-server.herokuapp.com/notes", createForm);

    //update State
    setNotes([...notes, res.data.note]);

    //Clear State
    setCreateForm({ title: "", body: "" });
  };

  const deleteNote = async (_id) => {
    //delete Note
    const res = await axios.delete(`https://mjs-server.herokuapp.com/notes/${_id}`);
    //update state
    const newNotes = [...notes].filter((note) => {
      return note._id !== _id;
    });
    setNotes(newNotes);
  };

  const handleUpdateFieldChange = (e) => {
    const { value, name } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const toggleUpdate = (note) => {
    // Set state on update form
    setUpdateForm({ title: note.title, body: note.body, _id: note._id });
  };

  const updateNote = async (e) => {

    e.preventDefault();

    const { title, body } = updateForm;
    // Send the update request
   const res = await axios.put(`https://mjs-server.herokuapp.com/notes/${updateForm._id}`, {title, body});
  
    // Update State
    const newNotes = [...notes];
    const noteIndex = notes.findIndex(note => {
      return note._id === updateForm._id;
    });
    newNotes[noteIndex] = res.data.note;

    setNotes(newNotes);

    //Clear update form state
    setUpdateForm({
      _id: null,
      title: "",
      body: "",
    })

  };

  return (
    <div className="App">
      <div>
        <h1>Notes:</h1>
        {store.notes &&
          store.notes.map((note) => {
            return (
              <div key={note._id}>
                <h2>{note.title}</h2>
                <h3>{note.body}</h3>
                <button onClick={() => store.deleteNote(note._id)}>
                  Delete Note
                </button>
                <button onClick={() => store.toggleUpdate(note)}> Update Note</button>
              </div>
            );
          })}
      </div>


      {store.updateForm._id && (
        <div>
          <h2>Update Note</h2>
          <form onSubmit={store.updateNote}>
            <input
              onChange={store.handleUpdateFieldChange}
              value={store.updateForm.title}
              name="title"
            />
            <textarea
              onChange={store.handleUpdateFieldChange}
              value={store.updateForm.body}
              name="body"
            />
            <button type="submit">Update</button>
          </form>
        </div>
      )}
  {!store.updateForm._id &&  
      <div>
        <h2> Create Note</h2>
        <form onSubmit={store.createNote}>
          <input
            onChange={store.updateCreateFormField}
            value={store.createForm.title}
            name="title"
          />
          <textarea
            onChange={store.updateCreateFormField}
            value={store.createForm.body}
            name="body"
          />
          <button onClick={store.createNote}>Create note</button>
        </form>
      </div>}
    </div>
  );
}

export default App;
