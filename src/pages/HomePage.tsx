import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Dialog } from "@mui/material";
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
          <Timer seconds={minutesToSeconds(0.05)} alarmSound={alarmSound} />

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

export default HomePage;
