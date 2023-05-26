import React from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Button from "@mui/material/Button";

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
          <Button
            variant="contained"
            onClick={() => toggleUserSettings(!isUserSettingsModalOpen)}
            color="secondary"
            size="small"
          >
            settings
          </Button>
          <Button
            variant="contained"
            onClick={() => toggleShop(!isShopOpen)}
            color="primary"
            size="small"
          >
            Shop: {coinAmount?.toLocaleString()} coins
          </Button>
        </SignedIn>
        <SignedOut>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            href="/login"
          >
            login
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl={"https://pomoquest.vercel.app/"} />
        </SignedIn>
      </div>
    </div>
  );
}
