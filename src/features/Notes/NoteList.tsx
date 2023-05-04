import React from "react";
import Note from "./Note";

type Note = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  authorId: string;
};

type Props = {
  notes: Note[];
  ordered: boolean;
};

export default function NoteList({ notes, ordered }: Props) {
  return ordered ? (
    <ol>
      {notes?.map((note: Note) => {
        return <Note key={note.id} note={note} />;
      })}
    </ol>
  ) : (
    <ul className="flex w-11/12 flex-wrap gap-5">
      {notes?.map((note) => {
        return <Note key={note.id} note={note} />;
      })}
    </ul>
  );
}
