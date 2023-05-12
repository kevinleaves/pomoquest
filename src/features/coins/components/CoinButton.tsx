import React from "react";
import { api } from "~/utils/api";

interface Props {
  onClick: () => void;
  amount: number;
  operation: string;
}
export default function CoinButton({ onClick, amount, operation }: Props) {
  return (
    <>
      <button
        className="rounded-xl border border-slate-200 p-5 duration-200 hover:scale-125 hover:bg-pink-300"
        onClick={onClick}
      >
        {operation} {amount} COINS
      </button>
    </>
  );
}
