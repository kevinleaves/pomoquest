import React from "react";
import { api } from "~/utils/api";

interface Props {
  onClick: () => void;
  text: string;
}
export default function Button({ onClick, text }: Props) {
  return (
    <>
      <button
        className="rounded-xl border border-slate-200 bg-white p-5 duration-200 hover:scale-125 hover:bg-pink-300"
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
}
