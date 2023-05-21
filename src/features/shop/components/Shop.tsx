import React from "react";

interface Props {
  isShopOpen: boolean;
  off: () => void;
}

export default function Shop({ isShopOpen, off }: Props) {
  return isShopOpen ? (
    <div className="rounded-xl bg-white p-10 md:fixed md:left-1/2 md:top-1/2 md:h-3/4 md:w-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
      <div> THIS IS A SHOP</div>
      <button
        className="absolute right-0 top-0 text-4xl transition hover:scale-110"
        onClick={off}
      >
        close
      </button>
    </div>
  ) : null;
}
