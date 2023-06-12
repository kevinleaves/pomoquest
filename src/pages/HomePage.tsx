import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { useTheme } from "@mui/material/styles";
import { Dialog, Button, Snackbar, Alert } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Timer from "~/features/timer/components/Timer";
import { minutesToSeconds } from "~/features/timer/utils/timerUtils";
import Navbar from "~/features/navbar/components/Navbar";
import useToggle from "~/features/timer/hooks/useToogle";
import Shop from "~/features/shop/components/Shop";
import useUserSettings from "~/features/settings/hooks/useUserSettings";
import useShop from "~/features/shop/hooks/useShop";
import Settings from "~/features/settings/components/Settings";

export const HomePage: NextPage = () => {
  const [timerView, setTimerView] = useState("pomodoro");

  const [
    isUserSettingsModalOpen,
    { toggle: toggleUserSettings, off: exitSettings },
  ] = useToggle();

  const [isShopOpen, { toggle: toggleShop, off: exitShop }] = useToggle();
  const [toastStatus, { on: toastOn, off: toastOff }] = useToggle();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("md"));

  const {
    data: {
      alarmSound,
      pomoDuration,
      bgColor,
      shortBreakDuration,
      longBreakDuration,
    },
    mutations: { updateBgColor, updatePomoDuration },
    loading: { isUserSettingsLoading },
  } = useUserSettings();

  const durations = {
    pomodoro: pomoDuration,
    shortBreak: shortBreakDuration,
    longBreak: longBreakDuration,
  };

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
        <meta name="description" content="a new way to grind" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="flex min-h-screen flex-col items-center gap-5 bg-[#e3dff2] font-publicSans"
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
          <div className="flex gap-2">
            {["pomodoro", "shortBreak", "longBreak"].map((status, index) => (
              <Button
                key={index}
                onClick={() => setTimerView(status)}
                variant="contained"
                color="success"
                className="drop-shadow-lessBrutal"
                sx={{
                  bgcolor: timerView === status ? "black" : undefined,
                  "&:hover": {
                    bgcolor: timerView === status ? "black" : undefined,
                  },
                }}
              >
                {status}
              </Button>
            ))}
          </div>
          {timerView === "pomodoro" ? (
            <Timer
              seconds={minutesToSeconds(25)}
              alarmSound={"/basicalarm.wav"}
              setTimerView={setTimerView}
            />
          ) : null}
          {timerView === "shortBreak" ? (
            <Timer
              seconds={minutesToSeconds(5)}
              alarmSound={"/basicalarm.wav"}
              setTimerView={setTimerView}
            />
          ) : null}
          {timerView === "longBreak" ? (
            <Timer
              seconds={minutesToSeconds(15)}
              alarmSound={"/basicalarm.wav"}
              setTimerView={setTimerView}
            />
          ) : null}
        </SignedOut>
        <SignedIn>
          <div className="flex w-5/6 justify-center gap-2">
            {["pomodoro", "shortBreak", "longBreak"].map((status, index) => (
              <Button
                key={index}
                onClick={() => setTimerView(status)}
                variant="contained"
                color="success"
                className="drop-shadow-lessBrutal"
                sx={{
                  bgcolor: timerView === status ? "black" : undefined,
                  "&:hover": {
                    bgcolor: timerView === status ? "black" : undefined,
                  },
                }}
              >
                {status}
              </Button>
            ))}
          </div>
          {timerView === "pomodoro" ? (
            <Timer
              seconds={minutesToSeconds(pomoDuration)}
              alarmSound={"/basicalarm.wav"}
              setTimerView={setTimerView}
              toastOn={toastOn}
            />
          ) : null}
          {timerView === "shortBreak" ? (
            <Timer
              seconds={minutesToSeconds(shortBreakDuration)}
              alarmSound={"/basicalarm.wav"}
              setTimerView={setTimerView}
              toastOn={toastOn}
            />
          ) : null}
          {timerView === "longBreak" ? (
            <Timer
              seconds={minutesToSeconds(longBreakDuration)}
              alarmSound={"/basicalarm.wav"}
              setTimerView={setTimerView}
              toastOn={toastOn}
            />
          ) : null}

          <Dialog open={isUserSettingsModalOpen} onClose={exitSettings}>
            <Settings
              isUserSettingsModalOpen={isUserSettingsModalOpen}
              off={exitSettings}
              updateBgColor={updateBgColor}
              durations={{
                pomoDuration,
                shortBreakDuration,
                longBreakDuration,
              }}
              updatePomoDuration={updatePomoDuration}
            />
          </Dialog>
          <Dialog open={isShopOpen} onClose={exitShop}>
            <Shop isShopOpen={isShopOpen} off={exitShop} />
          </Dialog>

          <Button
            href="/notes"
            variant="contained"
            color="error"
            className="drop-shadow-lessBrutal"
          >
            view all notes
          </Button>
        </SignedIn>
        <div>
          {toastStatus ? (
            <Snackbar
              sx={{ height: "15%" }}
              open={toastStatus}
              // autoHideDuration={5000}
              onClose={toastOff}
              anchorOrigin={
                isMobile
                  ? { vertical: "top", horizontal: "right" }
                  : { vertical: "bottom", horizontal: "right" }
              }
            >
              <Alert severity="info">
                {`${durations[timerView as keyof typeof durations]} ${
                  durations[timerView as keyof typeof durations] === 1
                    ? "coin"
                    : "coins"
                } added!`}
              </Alert>
            </Snackbar>
          ) : null}
        </div>
      </main>
    </>
  );
};

export default HomePage;
