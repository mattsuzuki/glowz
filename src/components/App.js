import { useEffect } from "react";
import notesStore from "../stores/notesStore";
import Notes from "../components/Notes";
import UpdateForm from "../components/UpdateForm";
import CreateForm from "../components/CreateForm";
import "./App.css";

function App() {
  const store = notesStore();

  //Use Effect
  useEffect(() => {
    store.fetchNotes();
  }, []);

  return (
    <div className="App">
      <Notes />
      <UpdateForm />
      <CreateForm />
    </div>
  );
}

export default App;
