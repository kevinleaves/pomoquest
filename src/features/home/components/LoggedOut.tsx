import React from "react";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Dialog } from "@mui/material";
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import Timer from "~/features/timer/components/Timer";
import { minutesToSeconds } from "~/features/timer/utils/timerUtils";
import CoinView from "~/features/coins/components/CoinView";
import Navbar from "~/features/navbar/components/Navbar";
import Settings from "~/features/settings/components/Settings";
import useToggle from "~/features/timer/hooks/useToogle";
import useUserSettings from "~/features/settings/hooks/useUserSettings";
import Shop from "~/features/shop/components/Shop";

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
