import notesStore from "../stores/notesStore";

export default function Note({ note }) {
  const store = notesStore((store) => {
    return {
      deleteNote: store.deleteNote,
      toggleUpdate: store.toggleUpdate,
    };
  });

  return (
    <div className="note-section" key={note._id}>
      <h2>{note.title}</h2>
      <h3>{note.body}</h3>
      <button onClick={() => store.deleteNote(note._id)}>Delete Note</button>
      <button onClick={() => store.toggleUpdate(note)}>Update Note</button>
    </div>
  );
}
