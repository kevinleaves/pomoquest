import React from "react";
import Timer from "~/features/timer/components/Timer";
import { minutesToSeconds } from "~/features/timer/utils/timerUtils";

interface Props {
  alarmSound: string;
}

export default function LoggedOut({ alarmSound }: Props) {
  return (
    <>
      <Timer seconds={minutesToSeconds(25)} alarmSound={alarmSound} />
      <Timer seconds={minutesToSeconds(5)} alarmSound={alarmSound} />
    </>
  );
}
