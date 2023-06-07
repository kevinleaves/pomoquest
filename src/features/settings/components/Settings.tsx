import React, { useState } from "react";
import { api } from "~/utils/api";
import { TextField } from "@mui/material";
import { Button, Divider } from "@mui/material";

interface Props {
  isUserSettingsModalOpen: boolean;
  off: () => void;
  updateBgColor: (hexValue: string) => void;
  durations: {
    pomoDuration: number | string;
    shortBreakDuration: number | string;
    longBreakDuration: number | string;
  };
  updatePomoDuration: (
    pomoduration: string,
    shortduration: string,
    longduration: string
  ) => void;
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
    const shortDuration = timers.shortBreakDuration.toString();
    const longDuration = timers.longBreakDuration.toString();

    updatePomoDuration(pomoDuration, shortDuration, longDuration);
  };

  return isUserSettingsModalOpen ? (
    <div className="h-full rounded-xl bg-white p-10 font-publicSans md:fixed md:left-1/2 md:top-1/2 md:h-3/4 md:w-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
      <div className="text-2xl font-bold">Settings</div>
      <Divider className="py-5" textAlign="left">
        theme
      </Divider>
      <div className="flex flex-wrap gap-2">
        {possibleBGColors?.map((color) => (
          <button
            key={color.id}
            onClick={() => updateBgColor(color.value)}
            className="h-16 w-16 rounded-lg md:h-20 md:w-20"
            style={{ backgroundColor: color.value }}
          ></button>
        ))}
      </div>
      <Divider className="py-5" textAlign="left">
        duration
      </Divider>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 md:flex-row">
          <TextField
            type="text"
            defaultValue={timers.pomoDuration}
            value={timers.pomoDuration}
            color="secondary"
            inputProps={{ inputMode: "numeric", pattern: "^[1-9][0-9]*$" }}
            helperText="Pomodoro duration"
            onChange={(e) =>
              setTimers({ ...timers, pomoDuration: e.target.value })
            }
            required
            sx={{
              width: "6rem",
            }}
          />
          <TextField
            type="text"
            inputProps={{ inputMode: "numeric", pattern: "^[1-9][0-9]*$" }}
            defaultValue={timers.shortBreakDuration}
            value={timers.shortBreakDuration}
            color="secondary"
            helperText="Short break duration"
            required
            onChange={(e) =>
              setTimers({ ...timers, shortBreakDuration: e.target.value })
            }
            sx={{
              width: "6rem",
            }}
          />
          <TextField
            type="text"
            inputProps={{ inputMode: "numeric", pattern: "^[1-9][0-9]*$" }}
            defaultValue={timers.longBreakDuration}
            value={timers.longBreakDuration}
            color="secondary"
            helperText="Long break duration"
            required
            onChange={(e) =>
              setTimers({ ...timers, longBreakDuration: e.target.value })
            }
            sx={{
              width: "6rem",
            }}
          />
          <Button type="submit">change pomo duration</Button>
        </div>
      </form>
      <Divider />
      <button
        className="absolute right-5 top-3  text-2xl  font-bold transition hover:scale-110"
        onClick={off}
      >
        close
      </button>
    </div>
  ) : null;
}
