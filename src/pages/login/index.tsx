import React from "react";
import Head from "next/head";
import Link from "next/link";
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { api } from "~/utils/api";

export default function Login() {
  return (
    <>
      <Head>
        <title>pomoquest.io</title>
        <meta name="description" content="a quest in real life" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-screen flex-col items-center justify-center gap-5">
        {/* <SignedOut>
          <SignIn redirectUrl={"/"} />
        </SignedOut> */}
      </main>
    </>
  );
}
