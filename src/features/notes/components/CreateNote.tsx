import React, { useState } from "react";
import { api } from "~/utils/api";
const initialState = {
  title: "",
  content: "",
};

export default function CreateNote() {
  const { mutate } = api.notes.createNote.useMutation();

  const [newNote, setNewNote] = useState(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name }: { name: string } = e.target;
    const newObj = {
      ...newNote,
      [name]: e.target.value,
    };
    setNewNote(newObj);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      mutate(newNote);
    } catch (err) {
      console.error(err);
    }
    setNewNote(initialState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-11/12 flex-col gap-5 self-center rounded-lg border-2 border-slate-400 p-5"
    >
      <input
        className="focus: outline-none"
        type="text"
        onChange={handleChange}
        name="title"
        value={newNote.title}
        placeholder="title for a new note"
      ></input>
      <textarea
        className="focus:outline-none"
        onChange={handleChange}
        name="content"
        value={newNote.content}
        placeholder="new note content"
      ></textarea>
      <button
        className="w-25 rounded-lg border-2
        border-slate-400 hover:bg-purple-400"
        type="submit"
      >
        add new note!
      </button>
    </form>
  );
}
