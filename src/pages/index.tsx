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
import Settings from "~/features/settings/components/Settings";
import useToggle from "~/features/timer/hooks/useToogle";
import useUserSettings from "~/features/settings/hooks/useUserSettings";

const Home: NextPage = () => {
  const [isUserSettingsModalOpen, { toggle: toggleUserSettings, off }] =
    useToggle();

  const {
    data: {
      alarmSound,
      pomoDuration,
      bgColor,
      shortBreakDuration,
      longBreakDuration,
    },
    mutations: { updateBgColor },
  } = useUserSettings();

  const { data: coinAmount } = api.coins.getCoins.useQuery();

  return (
    <>
      <Head>
        <title>pomoquest.io</title>
        <meta name="description" content="notes but audio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="flex min-h-screen flex-col items-center gap-5 bg-[#343a40]"
        style={{ backgroundColor: bgColor }}
      >
        <Navbar
          isUserSettingsModalOpen={isUserSettingsModalOpen}
          toggleUserSettings={toggleUserSettings}
          coinAmount={coinAmount}
        />
        <SignedOut>
          <Timer seconds={minutesToSeconds(25)} alarmSound={alarmSound} />
          <Timer seconds={minutesToSeconds(5)} alarmSound={alarmSound} />
        </SignedOut>
        <SignedIn>
          <Timer
            seconds={minutesToSeconds(pomoDuration)}
            alarmSound={alarmSound}
          />
          <Timer
            seconds={minutesToSeconds(shortBreakDuration)}
            alarmSound={alarmSound}
          />
          <Timer
            seconds={minutesToSeconds(longBreakDuration)}
            alarmSound={alarmSound}
          />

          <Dialog open={isUserSettingsModalOpen} onClose={off}>
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
