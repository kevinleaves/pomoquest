import React from "react";
import { api } from "~/utils/api";

interface Props {
  onClick: () => void;
}
export default function CoinButton({ onClick }: Props) {
  return (
    <>
      <button
        className="rounded-xl border border-slate-200 p-5 duration-200 hover:scale-125 hover:bg-pink-300"
        onClick={() => onClick()}
      >
        ADD TEN COINS
      </button>
    </>
  );
}
