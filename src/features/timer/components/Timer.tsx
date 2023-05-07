import React, { useState, useEffect } from "react";

export default function Timer() {
  const minutesToSeconds = (minutes: number): number => {
    return minutes * 60;
  };
  const [time, setTime] = useState(minutesToSeconds(25));
  const minutes = Math.floor(time / 60);
  const remainingSeconds = time - minutes * 60;
  const formmatedTime = `${minutes}:${remainingSeconds}`;

  useEffect(() => {
    setInterval(() => {
      setTime(time - 1);
    }, 1000);
  }, [time]);

  return (
    <>
      <div>{formmatedTime}</div>
    </>
  );
}
