import notesStore from "../stores/notesStore";

export default function CreateForm() {
  const store = notesStore();

  if (store.UpdateForm._id) return <></>;
  return (
    <div className="notes-input">
      <h2 className="create-note"> Create Note</h2>
      <form className="note-form" onSubmit={store.createNote}>
        <input
          className="create-input"
          placeholder="Enter the title of your note"
          onChange={store.updateCreateFormField}
          value={store.CreateForm.title}
          name="title"
        />
        <textarea
          className="create-textarea"
          placeholder="Enter the Content of your note"
          onChange={store.updateCreateFormField}
          value={store.CreateForm.body}
          name="body"
        />

        <button id="create-button" onClick={store.createNote}>
          Create note
        </button>
      </form>
    </div>
  );
}
