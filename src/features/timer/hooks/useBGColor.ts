import { api } from "~/utils/api";

export default function useBGColor() {
  const {
    data: bgcolor,
    refetch: refetchBGColor,
    error,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = api.settings.getCurrentBgColor.useQuery();

  return {
    bgcolor,
    refetchBGColor,
    error,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  };
}
