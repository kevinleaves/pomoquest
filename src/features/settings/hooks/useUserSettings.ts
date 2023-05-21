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
  let { data: alarmSound } = api.settings.getCurrentAlarmSound.useQuery();

  let { data: pomoDuration } = api.settings.getPomoDuration.useQuery();

  let { data: bgColor } = api.settings.getCurrentBgColor.useQuery();

  let { data: shortBreakDuration } =
    api.settings.getShortBreakDuration.useQuery();

  let { data: longBreakDuration } =
    api.settings.getLongBreakDuration.useQuery();

  // mutations
  const { mutate: mutateBgColor } = api.settings.updateBgColor.useMutation({
    onSuccess: () => {
      void ctx.settings.getCurrentBgColor.invalidate();
    },
  });

  const updateBgColor = (hexValue: string) => {
    mutateBgColor({ hexValue });
  };

  // handle undefined w/ nullish coalescing operator
  bgColor = bgColor ?? "";
  alarmSound = alarmSound ?? "";
  pomoDuration = pomoDuration ?? 25;
  shortBreakDuration = shortBreakDuration ?? 5;
  longBreakDuration = longBreakDuration ?? 15;

  return {
    data: {
      bgColor,
      alarmSound,
      pomoDuration,
      shortBreakDuration,
      longBreakDuration,
    },
    mutations: {
      updateBgColor,
    },
  };
}