import React from "react";
import Link from "next/link";
import CreateNote from "~/features/Notes/CreateNote";
import NoteList from "~/features/Notes/NoteList";
import { api } from "~/utils/api";

export default function Notes() {
  const { data: notes, isLoading, error } = api.notes.getAll.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="flex h-screen w-screen flex-col items-center gap-5">
      <Link
        className="border-solid-grey rounded-lg border-2 p-3 hover:bg-purple-400"
        href="/"
      >
        back to homepage
      </Link>
      <CreateNote />

      <NoteList notes={notes} ordered={false} />
    </main>
  );
}
