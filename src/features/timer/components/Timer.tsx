import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import { formatTime, minutesToSeconds } from "../utils/timerUtils";
import useToggle from "../hooks/useToogle";

export default function Timer() {
  const [time, setTime] = useState(minutesToSeconds(25));
  const [status, { off: stopTimer, toggle: toggleTimer }] = useToggle();

  const formmatedTime = formatTime(time);

  const resetTimer = () => {
    setTime(minutesToSeconds(25));
    stopTimer();
  };

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;

    if (status) {
      intervalId = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [status]);

  const StartButtonWithSound = () => {
    const [play] = useSound("/ui-click.wav", { playbackRate: 2 });
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
      play();
      toggleTimer();
    };
    return (
      <button
        onClick={handleClick}
        className="grow rounded-2xl border p-2 shadow-md duration-200 hover:scale-125 hover:bg-purple-400 hover:text-white hover:shadow-xl"
      >
        {status ? "STOP" : "START"}
      </button>
    );
  };

  return (
    <div className="flex h-80 w-5/6 max-w-md flex-col items-center justify-center gap-5 overflow-hidden rounded-3xl border p-24 md:w-1/2">
      <div className="text-8xl md:text-9xl">{formmatedTime}</div>
      <div className="flex w-full gap-5">
        {StartButtonWithSound()}
        <button
          onClick={resetTimer}
          className="grow-0 rounded-2xl border p-2 shadow-md duration-200 hover:scale-125 hover:bg-purple-400 hover:text-white hover:shadow-xl"
        >
          RESET
        </button>
      </div>
    </div>
  );
}
