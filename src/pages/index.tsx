import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import Timer from "~/features/timer/components/Timer";
import { minutesToSeconds } from "~/features/timer/utils/timerUtils";
import CoinView from "~/features/coins/components/CoinView";
import Navbar from "~/features/navbar/components/Navbar";
import { useState } from "react";

function useAlarmSound() {
  const { data, isLoading, error } =
    api.settings.getCurrentAlarmSound.useQuery();

  // handle undefined w/ nullish coalescing operator
  const alarmSound = data ?? "";

  return { alarmSound: alarmSound, isLoading, error };
}

const Home: NextPage = () => {
  const { user } = useUser();

  const [input, setInput] = useState("");
  const { data: bgcolor, refetch: refetchBGColor } =
    api.settings.getCurrentBgColor.useQuery();

  const { alarmSound, isLoading, error } = useAlarmSound();

  const { mutate } = api.settings.updateBgColor.useMutation({
    onSuccess: () => refetchBGColor(),
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{"An error has occured: " + error.message}</h1>;

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
        <title>pomoquest.io</title>
        <meta name="description" content="notes but audio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="flex min-h-screen flex-col items-center gap-5"
        style={{ backgroundColor: bgcolor }}
      >
        <Navbar />
        <SignedOut>
          <Timer seconds={minutesToSeconds(25)} alarmSound={alarmSound} />
          <Timer seconds={minutesToSeconds(5)} alarmSound={alarmSound} />
        </SignedOut>
        <SignedIn>
          <Timer seconds={minutesToSeconds(25)} alarmSound={alarmSound} />
          <Timer seconds={minutesToSeconds(0.05)} alarmSound={alarmSound} />
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
