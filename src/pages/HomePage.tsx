import { useState, useEffect } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { Dialog, Button } from "@mui/material";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Timer from "~/features/timer/components/Timer";
import { minutesToSeconds } from "~/features/timer/utils/timerUtils";
import Navbar from "~/features/navbar/components/Navbar";
import Settings from "~/features/settings/components/Settings";
import useToggle from "~/features/timer/hooks/useToogle";
import Shop from "~/features/shop/components/Shop";
import useUserSettings from "~/features/settings/hooks/useUserSettings";
import useShop from "~/features/shop/hooks/useShop";

export const HomePage: NextPage = () => {
  const [timerView, setTimerView] = useState("pomodoro");

  const [
    isUserSettingsModalOpen,
    { toggle: toggleUserSettings, off: exitSettings },
  ] = useToggle();

  const [isShopOpen, { toggle: toggleShop, off: exitShop }] = useToggle();

  const {
    data: {
      alarmSound,
      pomoDuration,
      bgColor,
      shortBreakDuration,
      longBreakDuration,
    },
    mutations: { updateBgColor },
    loading: { isUserSettingsLoading },
  } = useUserSettings();

  const {
    data: { coinAmount },
    loading: { isCoinsLoading },
  } = useShop();

  if (isUserSettingsLoading || isCoinsLoading) {
    return <h1>loading...</h1>;
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
        style={{ backgroundColor: bgColor }}
      >
        <Navbar
          isUserSettingsModalOpen={isUserSettingsModalOpen}
          toggleUserSettings={toggleUserSettings}
          coinAmount={coinAmount}
          isShopOpen={isShopOpen}
          toggleShop={toggleShop}
        />
        <SignedOut>
          <Timer seconds={minutesToSeconds(25)} alarmSound={alarmSound} />
          <Timer seconds={minutesToSeconds(5)} alarmSound={alarmSound} />
        </SignedOut>
        <SignedIn>
          <div className="flex gap-2">
            {["pomodoro", "shortBreak", "longBreak"].map((status, index) => (
              <Button
                key={index}
                onClick={() => setTimerView(status)}
                variant="contained"
                color="success"
              >
                {status}
              </Button>
            ))}
          </div>
          {timerView === "pomodoro" ? (
            <Timer
              seconds={minutesToSeconds(pomoDuration)}
              alarmSound={"/basicalarm.wav"}
            />
          ) : null}
          {timerView === "shortBreak" ? (
            <Timer
              seconds={minutesToSeconds(shortBreakDuration)}
              alarmSound={"/basicalarm.wav"}
            />
          ) : null}
          {timerView === "longBreak" ? (
            <Timer
              seconds={minutesToSeconds(longBreakDuration)}
              alarmSound={"/basicalarm.wav"}
            />
          ) : null}

          <Dialog open={isUserSettingsModalOpen} onClose={exitSettings}>
            <Settings
              isUserSettingsModalOpen={isUserSettingsModalOpen}
              off={exitSettings}
              updateBgColor={updateBgColor}
              // pomoDuration={pomoDuration}
            />
          </Dialog>
          <Dialog open={isShopOpen} onClose={exitShop}>
            <Shop isShopOpen={isShopOpen} off={exitShop} />
          </Dialog>

          <Button href="/notes" variant="contained" color="error">
            view all notes
          </Button>
        </SignedIn>
      </main>
    </>
  );
};

export default HomePage;
