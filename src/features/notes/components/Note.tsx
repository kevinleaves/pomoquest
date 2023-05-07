import React from "react";
import { api } from "~/utils/api";

type Note = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  authorId: string;
};

type Props = {
  note: Note;
};

export default function Note({ note }: Props) {
  const { mutate } = api.notes.deleteNote.useMutation();

  const handleDelete = (noteId: string): void => {
    mutate({ noteId });
  };

  return (
    <li className="break-words  rounded-xl border-2 border-slate-500 p-2">
      <p className="text-2xl">{note.title}</p>
      <p>{note.content}</p>
      <p onClick={() => handleDelete(note.id)}>🗑️</p>
    </li>
  );
}
