import React from "react";
import { api } from "~/utils/api";
import Button from "../../common/components/Button";

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
      <Button text={"ADD 10 COINS"} onClick={() => addTenCoins()} />
      <Button text={"ADD 25 COINS"} onClick={() => addCoins({ amount: 25 })} />
      <Button
        text={"SUBTRACT 25 COINS"}
        onClick={() => subtractCoins({ amount: 25 })}
      />
    </>
  );
}
