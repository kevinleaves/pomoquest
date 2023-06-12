import React, { useState, useEffect, useCallback } from "react";
import useSound from "use-sound";
import { formatTime } from "../utils/timerUtils";
import useToggle from "../hooks/useToogle";
import { api } from "~/utils/api";
import { Button } from "@mui/material";

interface Props {
  seconds: number;
  alarmSound: string;
  setTimerView: React.Dispatch<React.SetStateAction<string>>;
  toastOn?: () => void;
}

export default function Timer({
  seconds,
  alarmSound,
  setTimerView,
  toastOn,
}: Props) {
  const [time, setTime] = useState(seconds);
  const [status, { off: stopTimer, toggle: toggleTimer }] = useToggle();

  const [playClick] = useSound("/ui-click.wav", { playbackRate: 2 });

  const [playAlarm] = useSound(alarmSound, { playbackRate: 2 });

  const ctx = api.useContext();

  const formmatedTime = formatTime(time);

  const addCoinsMutation = api.coins.addCoins.useMutation({
    onSuccess: useCallback(() => {
      void ctx.coins.getCoins.invalidate();
    }, [ctx.coins.getCoins]),
  });

  const { mutate: addCoins } = addCoinsMutation;

  const resetTimer = () => {
    setTime(seconds);
    stopTimer();
  };

  const handleClick = () => {
    playClick();
    toggleTimer();
  };

  // function to fire sideeffects when timer runs out
  const handleTimerEnd = useCallback(() => {
    stopTimer();
    addCoins({ amount: seconds / 60 });
    playAlarm();
    // set timer view based on prior state
    setTimerView((prevTimerView) => {
      switch (prevTimerView) {
        case "pomodoro":
          console.log("i can fire sideeffects in here?"); // THIS WORKS
          toastOn?.();
          return "shortBreak";
        case "shortBreak":
          return "pomodoro";
        case "longBreak":
          return "pomodoro";
        default:
          return prevTimerView;
      }
    });
  }, [stopTimer, addCoins, playAlarm, setTimerView]);

  // update timer component state when seconds prop changes. i thought when seconds changed the Timer component would rerender, causing the time to update, but this is not the case.
  useEffect(() => {
    setTime(seconds);
  }, [seconds]);

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;

    if (status && time > 0) {
      intervalId = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    }

    if (time === 0) {
      handleTimerEnd();
    }

    return () => clearInterval(intervalId);
  }, [status, time, handleTimerEnd]);

  return (
    <div className="flex h-80 w-5/6 max-w-md flex-col items-center justify-center gap-5 overflow-hidden rounded-3xl border bg-[#FDFD96] p-24 text-black drop-shadow-brutal md:w-1/2">
      <div className="text-8xl font-semibold md:text-9xl">{formmatedTime}</div>
      <div className="flex w-full justify-center gap-5">
        <Button
          onClick={handleClick}
          variant="contained"
          className="drop-shadow-lessBrutal"
        >
          {status ? "STOP" : "START"}
        </Button>
        <Button
          onClick={resetTimer}
          variant="contained"
          className="drop-shadow-lessBrutal"
        >
          reset
        </Button>
      </div>
    </div>
  );
}
