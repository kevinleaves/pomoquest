import React, { useState } from "react";
import { api } from "~/utils/api";

interface Props {
  isShopOpen: boolean;
  off: () => void;
}

function buyItem() {
  // logic to buy an item
  console.log("bought!");
}

export default function Shop({ isShopOpen, off }: Props) {
  const [currentlySelected, setCurrentlySelected] = useState(2);
  const { data: purchasableBGColors, isLoading } =
    api.unlockedSettings.getLockedBGColors.useQuery();

  return isShopOpen ? (
    <div className="rounded-xl bg-white p-10 md:fixed md:left-1/2 md:top-1/2 md:h-3/4 md:w-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
      <div className="text-center font-publicSans text-3xl font-bold">SHOP</div>
      <button
        className="absolute right-0 top-0 text-4xl transition hover:scale-110"
        onClick={off}
      >
        close
      </button>
      <div className="flex h-5/6 flex-col items-center gap-2 rounded-xl">
        {purchasableBGColors?.map((obj, index) => (
          <div
            key={index}
            onClick={() => setCurrentlySelected(index)}
            className={`flex w-5/6 justify-between ${
              index === currentlySelected ? "rounded-xl border-2" : ""
            }`}
          >
            <button
              className="h-20 w-20 rounded-lg"
              style={{ backgroundColor: obj.value }}
            ></button>
            <button
              className="transition hover:text-red-500"
              onClick={() => buyItem()}
            >
              {obj.cost} coins
            </button>
          </div>
        ))}
      </div>
    </div>
  ) : null;
}
