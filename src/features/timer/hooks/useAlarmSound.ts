import { api } from "~/utils/api";

/**
 * gets user's current alarm sound
 * @returns {alarmSound, isLoading, error}
 */
export default function useAlarmSound() {
  const { data, isLoading, error } =
    api.settings.getCurrentAlarmSound.useQuery();

  // handle undefined w/ nullish coalescing operator
  const alarmSound = data ?? "";

  return { alarmSound, isLoading, error };
}
