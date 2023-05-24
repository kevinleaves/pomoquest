import { api } from "~/utils/api";
// house all settings API calls within this hook.
// returns object w/ query data, and mutation functions that contains results of many different settings calls

/**
 house all settings API calls within this hook.
 returns object w/ query data, and mutation functions that contains results of many different settings calls
 * @returns {data, mutations}
 */
export default function useUserSettings() {
  const ctx = api.useContext();

  // queries
  const { data: alarmSound, isLoading: isAlarmSoundLoading } =
    api.settings.getCurrentAlarmSound.useQuery();

  const { data: pomoDuration, isLoading: isPomoDurationLoading } =
    api.settings.getPomoDuration.useQuery();

  const { data: bgColor } = api.settings.getCurrentBgColor.useQuery();

  const { data: shortBreakDuration, isLoading: isSBreakLoading } =
    api.settings.getShortBreakDuration.useQuery();

  const { data: longBreakDuration, isLoading: isLBreakLoading } =
    api.settings.getLongBreakDuration.useQuery();

  const { mutate: mutateBgColor } = api.settings.updateBgColor.useMutation({
    onSuccess: () => {
      void ctx.settings.getCurrentBgColor.invalidate();
    },
  });

  const updateBgColor = (hexValue: string) => {
    mutateBgColor({ hexValue });
  };

  return {
    data: {
      bgColor: bgColor ?? "",
      alarmSound: alarmSound ?? "",
      pomoDuration: pomoDuration ?? 25,
      shortBreakDuration: shortBreakDuration ?? 5,
      longBreakDuration: longBreakDuration ?? 15,
    },
    mutations: {
      updateBgColor,
    },
    loading: {
      isAlarmSoundLoading,
      isPomoDurationLoading,
      isSBreakLoading,
      isLBreakLoading,
    },
  };
}
