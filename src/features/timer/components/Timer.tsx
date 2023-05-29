import React, { useState, useEffect, useCallback } from "react";
import useSound from "use-sound";
import { formatTime } from "../utils/timerUtils";
import useToggle from "../hooks/useToogle";
import { api } from "~/utils/api";
import { Button } from "@mui/material";

interface Props {
  seconds: number;
  alarmSound: string;
}

export default function Timer({ seconds, alarmSound }: Props) {
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

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;

    if (status && time > 0) {
      intervalId = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    }

    if (time === 0) {
      addCoins({ amount: 25 });
      playAlarm();
    }

    return () => clearInterval(intervalId);
  }, [status, time, addCoins, playAlarm]);

  return (
    <div className="flex h-80 w-5/6 max-w-md flex-col items-center justify-center gap-5 overflow-hidden rounded-3xl border bg-[#212A3E] p-24 text-white md:w-1/2">
      <div className="text-8xl md:text-9xl">{formmatedTime}</div>
      <div className="flex w-full justify-center gap-5">
        <Button onClick={handleClick} variant="contained">
          {status ? "STOP" : "START"}
        </Button>
        <Button onClick={resetTimer} variant="contained">
          reset
        </Button>
      </div>
    </div>
  );
}
