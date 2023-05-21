import React from "react";
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

interface Props {
  isUserSettingsModalOpen: boolean;
  toggleUserSettings: React.Dispatch<React.SetStateAction<boolean>>;
  isShopOpen: boolean;
  toggleShop: React.Dispatch<React.SetStateAction<boolean>>;
  coinAmount: number | undefined;
}

export default function Navbar({
  isUserSettingsModalOpen,
  toggleUserSettings,
  coinAmount,
  isShopOpen,
  toggleShop,
}: Props) {
  return (
    <div className="flex items-center justify-between border-b border-slate-300 p-2 md:h-16 md:w-1/2">
      <h1 className="text-md justify-self-center text-[#F1F6F9] md:text-3xl">
        pomoquest
      </h1>
      <div className="flex gap-2 md:gap-5">
        <SignedIn>
          <button
            className="font-light text-[#F1F6F9]"
            onClick={() => toggleUserSettings(!isUserSettingsModalOpen)}
          >
            settings
          </button>
          <button
            className="font-light text-[#F1F6F9]"
            onClick={() => toggleShop(!isShopOpen)}
          >
            {coinAmount?.toLocaleString()}
          </button>
        </SignedIn>
        <SignedOut>
          <Link
            className="rounded-lg p-3 text-white transition hover:bg-purple-400"
            href={"/login"}
          >
            login
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton
            afterSignOutUrl={"https://t3cruddymusicnotes.vercel.app/"}
          />
        </SignedIn>
      </div>
    </div>
  );
}
