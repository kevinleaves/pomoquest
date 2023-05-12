import React from "react";
import { api } from "~/utils/api";
import CoinButton from "./CoinButton";

export default function CoinView() {
  // setup - state and hooks
  const {
    data: coins,
    isLoading,
    error,
    refetch: refetchCoins,
  } = api.coins.getCoins.useQuery();

  const { mutate: addTenCoins } = api.coins.addTenCoins.useMutation({
    onSuccess: () => refetchCoins(),
  });

  const { mutate: addCoins } = api.coins.addCoins.useMutation({
    onSuccess: () => refetchCoins(),
  });

  const { mutate: subtractCoins } = api.coins.subtractCoins.useMutation({
    onSuccess: () => refetchCoins(),
  });

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
      <CoinButton operation={"ADD"} onClick={() => addTenCoins()} amount={10} />
      <CoinButton
        operation={"ADD"}
        onClick={() => addCoins({ amount: 25 })}
        amount={25}
      />
      <CoinButton
        operation={"SUBTRACT"}
        onClick={() => subtractCoins({ amount: 25 })}
        amount={25}
      />
    </>
  );
}
