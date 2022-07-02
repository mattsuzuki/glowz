import notesStore from "../stores/notesStore";

export default function Notes() {
    const store = notesStore();

  return (
    <div>
      <h1>Notes:</h1>
      {store.notes &&
        store.notes.map((note) => {
          return 
            <note note={note} key={note._id} />;
        })}
    </div>
  );
}
