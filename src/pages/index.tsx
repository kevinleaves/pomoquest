import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import {
  SignIn,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
} from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { user } = useUser();
  return (
    <>
      <Head>
        <title>aud.io</title>
        <meta name="description" content="notes but audio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        <SignedOut>
          <SignIn />
        </SignedOut>

        <SignedIn>
          <UserButton />
          {user?.username} is signed in!
          {/* {user?.id} */}
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
