import React from "react";
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between border-b border-slate-300 p-2 md:h-16 md:w-1/2">
      <h1 className="text-md justify-self-center text-[#F1F6F9] md:text-3xl">
        pomoquest
      </h1>
      <div className="flex gap-2 md:gap-5">
        <button className="font-light text-[#F1F6F9]">settings</button>
        <button className="font-light text-[#F1F6F9]">coins</button>
        <SignedOut>
          <Link
            className="border-solid-grey rounded-lg border-2 p-3 hover:bg-purple-400"
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
