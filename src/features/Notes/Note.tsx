import React from "react";

type Note = {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  authorId: string;
};

type Props = {
  note: Note;
};

export default function Note({ note }: Props) {
  return (
    <li>
      <p>{note.id}</p>
      <p>{note.content}</p>
    </li>
  );
}
