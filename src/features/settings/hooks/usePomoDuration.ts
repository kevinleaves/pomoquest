import { api } from "~/utils/api";

/**
 * gets user's current pomo duration
 * @returns {pomoDuration, isLoading, error}
 */
export default function usePomoDuration() {
  const { data, isLoading, error } = api.settings.getPomoDuration.useQuery();

  // handle undefined w/ nullish coalescing operator
  const pomoDuration = data ?? 25;

  return { pomoDuration, isLoading, error };
}
