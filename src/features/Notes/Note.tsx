import React from "react";

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
  return (
    <li>
      <p>{note.title}</p>
      <p>{note.content}</p>
    </li>
  );
}
