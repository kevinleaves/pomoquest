import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Dialog } from "@mui/material";
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import Timer from "~/features/timer/components/Timer";
import { minutesToSeconds } from "~/features/timer/utils/timerUtils";
import CoinView from "~/features/coins/components/CoinView";
import Navbar from "~/features/navbar/components/Navbar";
import useAlarmSound from "~/features/timer/hooks/useAlarmSound";
import useBGColor from "~/features/timer/hooks/useBGColor";
import Settings from "~/features/settings/components/Settings";
import useToggle from "~/features/timer/hooks/useToogle";

const Home: NextPage = () => {
  const [isUserSettingsModalOpen, { toggle: toggleUserSettings, off }] =
    useToggle();
  const { bgcolor } = useBGColor();
  const { alarmSound } = useAlarmSound();

  const ctx = api.useContext();

  const { mutate } = api.settings.updateBgColor.useMutation({
    onSuccess: () => {
      void ctx.settings.getCurrentBgColor.invalidate();
    },
  });

  const updateBgColor = (hexValue: string) => {
    mutate({ hexValue });
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
        style={{ backgroundColor: bgcolor }}
      >
        <Navbar
          isUserSettingsModalOpen={isUserSettingsModalOpen}
          toggleUserSettings={toggleUserSettings}
        />
        <SignedOut>
          <Timer seconds={minutesToSeconds(25)} alarmSound={alarmSound} />
          <Timer seconds={minutesToSeconds(5)} alarmSound={alarmSound} />
        </SignedOut>
        <SignedIn>
          <Timer seconds={minutesToSeconds(25)} alarmSound={alarmSound} />
          <Timer seconds={minutesToSeconds(0.05)} alarmSound={alarmSound} />

          <Dialog open={isUserSettingsModalOpen}>
            <Settings
              isUserSettingsModalOpen={isUserSettingsModalOpen}
              off={off}
              updateBgColor={updateBgColor}
            />
          </Dialog>

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
