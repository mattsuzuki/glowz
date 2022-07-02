import create from "zustand";
import axios from "axios";

const notesStore = create((set) => ({
  notes: null,

  CreateForm: {
    title: "",
    body: "",
  },

  UpdateForm: {
    _id: null,
    title: "",
    body: "",
  },

  fetchNotes: async () => {
    //Fetch the notes
    const res = await axios.get("https://mjs-server.herokuapp.com/notes");
    // Set to state
    set({ notes: res.data.notes });
  },

  updateCreateFormField: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        CreateForm: {
          ...state.CreateForm,
          [name]: value,
        },
      };
    });
  },

  createNote: async (e) => {
    e.preventDefault();

    const { CreateForm, notes } = notesStore.getState();
    const res = await axios.post("https://mjs-server.herokuapp.com/notes", CreateForm);

    //update State
    set({
      notes: [...notes, res.data.note],
      CreateForm: {
        title: "",
        body: "",
      },
    });
  },

  deleteNote: async (_id) => {
    //delete Note
    const res = await axios.delete(`https://mjs-server.herokuapp.com/notes/${_id}`);
    const { notes } = notesStore.getState();
    //update state
    const newNotes = notes.filter((note) => {
      return note._id !== _id;
    });
    set({ notes: newNotes });
  },

  handleUpdateFieldChange: (e) => {
    const { value, name } = e.target;

    set((state) => {
      return {
        UpdateForm: {
          ...state.UpdateForm,
          [name]: value,
        },
      };
    });
  },

  toggleUpdate: ({ _id, title, body }) => {
    set({
      UpdateForm: {
        title,
        body,
        _id,
      },
    });
  },

  updateNote: async (e) => {
    e.preventDefault();

    const { UpdateForm: {title, body, _id },
    notes,
     } = notesStore.getState();

    // Send the update request
    const res = await axios.put(
      `https://mjs-server.herokuapp.com/notes/${_id}`, {
         title, 
         body,
    });

    // Update State
    const newNotes = [...notes];
    const noteIndex = notes.findIndex((note) => {
      return note._id === _id;
    });
    newNotes[noteIndex] = res.data.note;

    set({
        notes: newNotes,
        UpdateForm: {
            _id: null,
            title: "",
            body: "",
        },
    });
  },
}));

export default notesStore;
