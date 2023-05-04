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
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { user } = useUser();
  return (
    <>
      <Head>
        <title>aud.io</title>
        <meta name="description" content="notes but audio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        <p className="text-2xl">
          {hello.data ? hello.data.greeting : "Loading tRPC query..."}
        </p>
        <SignedOut>
          <SignIn />
        </SignedOut>

        <SignedIn>
          {user?.username} is signed in!
          <UserButton />
        </SignedIn>
      </main>
    </>
  );
};

export default Home;
