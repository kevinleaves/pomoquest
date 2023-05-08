import React, { useState, useEffect } from "react";

const minutesToSeconds = (minutes: number): number => {
  return minutes * 60;
};

const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const remainingSeconds = timeInSeconds - minutes * 60;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
};

export default function Timer() {
  const [time, setTime] = useState(minutesToSeconds(25));
  const formmatedTime = formatTime(time);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div>{formmatedTime}</div>
    </>
  );
}
