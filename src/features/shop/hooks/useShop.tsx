import { api } from "~/utils/api";
import { useAuth } from "@clerk/nextjs";

export default function useShop() {
  const ctx = api.useContext();
  const { isSignedIn } = useAuth();

  const { data: coinAmount, isInitialLoading: isCoinsLoading } =
    api.coins.getCoins.useQuery(undefined, { enabled: !!isSignedIn });

  return {
    data: {
      coinAmount: coinAmount ?? 0,
    },
    loading: {
      isCoinsLoading,
    },
  };
}
