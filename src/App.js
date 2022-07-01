import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  //State
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });

  //Use Effect
  useEffect(() => {
    fetchNotes();
  }, []);

  //Functions
  const fetchNotes = async () => {
    //Fetch the notes
    const res = await axios.get("http://localhost:3000/notes");
    // Set to state
    console.log(res);
    setNotes(res.data.notes);
    console.log(res);
  };

  const updateCreateFormField = (e) => {
    const {name, value } = e.target;

    setCreateForm({
      ...createForm,
      [name]: value

    })
  
  };

  const createNote = async (e) => {
    e.preventDefault();
    //Create the note
    const res = await axios.post("http://localhost:3000/notes", createForm);

    //update State
    setNotes([...notes, res.data.note])
    console.log(res)

    //Clear State
    setCreateForm({title: '', body: ''})
  };

  const deleteNote = async (_id) => {
    //delete Note
    const res = await axios.delete(`http://localhost:3000/notes/${_id}`);
    //update state
    const newNotes = [...notes].filter((note) => {
      return note._id !==_id;
    });
    setNotes(newNotes);
  };

  return (
    <div className="App">
      <div>
        <h1>Notes:</h1>
        {notes &&
          notes.map((note) => {
            return (
              <div key={note._id}>
                <h2>{note.title}</h2>
                <h3>{note.body}</h3>
                <button>Delete Note</button>
              </div>
            );
          })}
      </div>
      <div>
        <h2> Create Note</h2>
        <form onSubmit={createNote}>
          <input
            onChange={updateCreateFormField}
            value={createForm.title}
            name="title"
          />
          <textarea
            onChange={updateCreateFormField}
            value={createForm.body}
            name="body"
          />
          <button onClick={deleteNote}>Create note</button>
        </form>
      </div>
    </div>
  );
}

export default App;
