import Head from "next/head";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { useState } from "react";
import Navbar from "~/features/navbar/components/Navbar";
import useToggle from "~/features/timer/hooks/useToogle";
import LoggedIn from "~/features/home/components/LoggedIn";
import LoggedOut from "~/features/home/components/LoggedOut";

export const HomePage = () => {
  const [color, setColor] = useState("");

  const { isSignedIn } = useAuth();
  const [
    isUserSettingsModalOpen,
    { toggle: toggleUserSettings, off: exitSettings },
  ] = useToggle();

  const [isShopOpen, { toggle: toggleShop, off: exitShop }] = useToggle();

  const handleBgColor = (value: string) => {
    setColor(value);
  };

  const {
    data: coinAmount,
    isLoading,
    fetchStatus,
  } = api.coins.getCoins.useQuery(undefined, { enabled: !!isSignedIn });

  // guard clause
  if (isLoading && fetchStatus !== "idle") {
    // query does not run when user is logged out but still guards when logged in
    return <div>the getCoins query is enabled and actually loading </div>;
  }

  return (
    <>
      <Head>
        <title>pomoquest.io</title>
        <meta name="description" content="notes but audio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="flex min-h-screen flex-col items-center gap-5 bg-[#343a40]"
        style={{ backgroundColor: color || "#343a40" }}
      >
        <Navbar
          isUserSettingsModalOpen={isUserSettingsModalOpen}
          toggleUserSettings={toggleUserSettings}
          coinAmount={coinAmount}
          isShopOpen={isShopOpen}
          toggleShop={toggleShop}
        />
        <SignedOut>
          <LoggedOut alarmSound="/basicalarm.wav" />
        </SignedOut>
        <SignedIn>
          <LoggedIn
            isUserSettingsModalOpen={isUserSettingsModalOpen}
            isShopOpen={isShopOpen}
            exitSettings={exitSettings}
            exitShop={exitShop}
            handleBgColor={handleBgColor}
          />
        </SignedIn>
      </main>
    </>
  );
};

export default HomePage;
