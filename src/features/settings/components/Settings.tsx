import React, { useState } from "react";
import { api } from "~/utils/api";
import { TextField } from "@mui/material";

interface Props {
  isUserSettingsModalOpen: boolean;
  off: () => void;
  updateBgColor: (hexValue: string) => void;
  durations: {
    pomoDuration: number | string;
    shortBreakDuration: number;
    longBreakDuration: number;
  };
  updatePomoDuration: (duration: string) => void;
}

export default function Settings({
  isUserSettingsModalOpen,
  off,
  updateBgColor,
  durations: { pomoDuration, shortBreakDuration, longBreakDuration },
  updatePomoDuration,
}: Props) {
  const [timers, setTimers] = useState({
    pomoDuration,
    shortBreakDuration,
    longBreakDuration,
  });

  const { data: possibleBGColors } =
    api.unlockedSettings.getUnlockedBGColors.useQuery();

  const handleSubmit = (e: React.SyntheticEvent) => {
    console.log("submitted");
    e.preventDefault();
    const pomoDuration = timers.pomoDuration.toString();
    updatePomoDuration(pomoDuration);
  };

  return isUserSettingsModalOpen ? (
    <div className="h-full rounded-xl bg-white p-10 font-publicSans md:fixed md:left-1/2 md:top-1/2 md:h-3/4 md:w-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
      <div className="text-2xl font-bold">Settings</div>
      <h3 className="text-xl">theme</h3>
      <div className="flex gap-2">
        {possibleBGColors?.map((color) => (
          <button
            key={color.id}
            onClick={() => updateBgColor(color.value)}
            className="h-20 w-20 rounded-lg"
            style={{ backgroundColor: color.value }}
          ></button>
        ))}
      </div>
      <div className="flex"></div>
      <div className="flex"></div>
      <div className="flex"></div>

      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          defaultValue={timers.pomoDuration}
          value={timers.pomoDuration}
          color="secondary"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          helperText="Pomodoro duration"
          onChange={(e) =>
            setTimers({ ...timers, pomoDuration: e.target.value })
          }
        />
        <TextField
          type="number"
          defaultValue={shortBreakDuration}
          color="secondary"
          helperText="Short break duration"
        />
        <TextField
          type="number"
          defaultValue={longBreakDuration}
          color="secondary"
          helperText="Long break duration"
        />
        <button type="submit">change pomo duration</button>
      </form>
      <button
        className="absolute right-5 top-3  text-2xl  font-bold transition hover:scale-110"
        onClick={off}
      >
        close
      </button>
    </div>
  ) : null;
}
