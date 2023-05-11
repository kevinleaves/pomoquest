import React from "react";
import { api } from "~/utils/api";

export default function CoinView() {
  // setup - state and hooks
  const { data: coins, isLoading, error } = api.coins.getCoins.useQuery();

  // body - do something with the component's data
  const formattedCoins = coins?.toLocaleString();

  // guard clauses
  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="rounded-xl border border-slate-500 p-5">
        {formattedCoins}
      </div>
    </>
  );
}
