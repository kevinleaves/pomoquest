import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import Timer from "~/features/timer/components/Timer";
import { minutesToSeconds } from "~/features/timer/utils/timerUtils";
import CoinView from "~/features/coins/components/CoinView";
import { useState } from "react";

const Home: NextPage = () => {
  const { user } = useUser();

  const { data: bgcolor } = api.settings.getCurrentBgColor.useQuery();
  const { mutate } = api.settings.updateBgColor.useMutation();

  const [input, setInput] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const updateBgColor = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ hexValue: input });
  };

  return (
    <>
      <Head>
        <title>aud.io</title>
        <meta name="description" content="notes but audio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="flex min-h-screen flex-col items-center justify-center gap-5"
        style={{ backgroundColor: bgcolor }}
      >
        <SignedOut>
          <SignIn />
          <Timer seconds={minutesToSeconds(25)} />
        </SignedOut>

        <SignedIn>
          <UserButton />
          {user?.username} is signed in!
          <Timer seconds={minutesToSeconds(25)} />
          <Timer seconds={5} />
          <CoinView />
          <form onSubmit={updateBgColor}>
            <input value={input} onChange={handleInput}></input>
            <button type="submit">input a hexvalue</button>
          </form>
          <Link
            className="border-solid-grey rounded-lg border-2 p-3 hover:bg-purple-400"
            href="/notes"
          >
            view all notes
          </Link>
        </SignedIn>
      </main>
    </>
  );
};

export default Home;
