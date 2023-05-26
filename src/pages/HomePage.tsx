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

  const { data: coinAmount } = api.coins.getCoins.useQuery(undefined, {
    enabled: !!isSignedIn,
  });

  const handleBgColor = (value: string) => {
    setColor(value);
  };

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
