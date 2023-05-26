import React, { useEffect } from "react";
import Link from "next/link";
import { Dialog } from "@mui/material";
import { api } from "~/utils/api";
import Timer from "~/features/timer/components/Timer";
import { minutesToSeconds } from "~/features/timer/utils/timerUtils";
import Settings from "~/features/settings/components/Settings";
import useToggle from "~/features/timer/hooks/useToogle";
import useUserSettings from "~/features/settings/hooks/useUserSettings";
import Shop from "~/features/shop/components/Shop";

interface Props {
  isUserSettingsModalOpen: boolean;
  exitSettings: () => void;
  isShopOpen: boolean;
  exitShop: () => void;
  handleBgColor: (value: string) => void;
}
export default function LoggedIn({
  isUserSettingsModalOpen,
  exitSettings,
  isShopOpen,
  exitShop,
  handleBgColor,
}: Props) {
  const {
    data: {
      alarmSound,
      pomoDuration,
      bgColor,
      shortBreakDuration,
      longBreakDuration,
    },
    mutations: { updateBgColor },
    loading: {
      isAlarmSoundLoading,
      isLBreakLoading,
      isPomoDurationLoading,
      isSBreakLoading,
    },
  } = useUserSettings();

  useEffect(() => {
    if (bgColor) {
      handleBgColor(bgColor);
    }
  }, [bgColor, handleBgColor]);

  if (
    isAlarmSoundLoading ||
    isLBreakLoading ||
    isPomoDurationLoading ||
    isSBreakLoading
  ) {
    return <h1>loading...</h1>;
  }

  return (
    <>
      <Timer seconds={minutesToSeconds(pomoDuration)} alarmSound={alarmSound} />
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
    </>
  );
}
