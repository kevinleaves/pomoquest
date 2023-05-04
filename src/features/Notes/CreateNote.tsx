import React, { useState } from "react";
import { api } from "~/utils/api";
const initialState = {
  title: "",
  content: "",
};

export default function CreateNote() {
  const { mutate } = api.notes.createNote.useMutation();

  const [newNote, setNewNote] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name }: { name: string } = e.target;
    const newObj = {
      ...newNote,
      [name]: e.target.value,
    };
    setNewNote(newObj);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(newNote);
    setNewNote(initialState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 border-2 border-gray-400"
    >
      <input
        type="text"
        onChange={handleChange}
        name="title"
        value={newNote.title}
        placeholder="title for a new note"
      ></input>
      <input
        type="text"
        onChange={handleChange}
        name="content"
        value={newNote.content}
        placeholder="new note content"
      ></input>
      <button
        className="border-2 border-gray-400 hover:bg-purple-400"
        type="submit"
      >
        add new note!
      </button>
    </form>
  );
}
