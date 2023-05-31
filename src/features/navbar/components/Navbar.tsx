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
    <div className="flex w-full flex-wrap items-center justify-between border-b border-slate-300 bg-[#FFFFFF] p-2 md:h-16">
      <h1 className="justify-self-center text-center text-xl font-extrabold text-black md:text-3xl ">
        pomoquest
      </h1>
      <div className="flex gap-2 md:gap-5">
        <SignedIn>
          <Button
            variant="contained"
            onClick={() => toggleUserSettings(!isUserSettingsModalOpen)}
            color="secondary"
            size="small"
            className="drop-shadow-lessBrutal"
          >
            settings
          </Button>
          <Button
            variant="contained"
            onClick={() => toggleShop(!isShopOpen)}
            color="primary"
            size="small"
            className="drop-shadow-lessBrutal"
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
            className="drop-shadow-lessBrutal"
          >
            login
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton
            afterSignOutUrl={"https://pomoquest.vercel.app/"}
            appearance={{
              elements: {
                userButtonTrigger: "rounded-md",
                avatarBox: "rounded-md",
              },
            }}
          />
        </SignedIn>
      </div>
    </div>
  );
}
