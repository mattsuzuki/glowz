import notesStore from "../stores/notesStore";


export default function UpdateForm() {
    const store = notesStore();

    if (!store.UpdateForm._id) return <></>;

  return (
        <div>
          <h2>Update Note</h2>
          <form onSubmit={store.updateNote}>
            <input
              onChange={store.handleUpdateFieldChange}
              value={store.UpdateForm.title}
              name="title"
            />
            <textarea
              onChange={store.handleUpdateFieldChange}
              value={store.UpdateForm.body}
              name="body"
            />
            <button type="submit">Update</button>
          </form>
        </div>
      )};


