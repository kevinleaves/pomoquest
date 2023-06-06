import { api } from "~/utils/api";
import { useAuth } from "@clerk/nextjs";
// house all settings API calls within this hook.
// returns object w/ query data, and mutation functions that contains results of many different settings calls

/**
 house all settings API calls within this hook.
 returns object w/ query data, and mutation functions that contains results of many different settings calls
 * @returns {data, mutations}
 */
export default function useUserSettings() {
  const ctx = api.useContext();
  const { isSignedIn } = useAuth();
  // queries

  const { data: userSettings, isInitialLoading: isUserSettingsLoading } =
    api.settings.getAllUserSettings.useQuery(undefined, {
      enabled: !!isSignedIn,
    });

  const { mutate: mutateBgColor, isLoading: isBgColorMutating } =
    api.settings.updateBgColor.useMutation({
      onSuccess: () => {
        void ctx.settings.getAllUserSettings.invalidate();
      },
    });

  const updateBgColor = (hexValue: string) => {
    mutateBgColor({ hexValue });
  };

  const { mutate: mutatePomoduration } =
    api.settings.mutatePomoduration.useMutation({
      onSuccess: () => {
        void ctx.settings.getAllUserSettings.invalidate();
      },
    });

  const updatePomoDuration = (duration: string) => {
    mutatePomoduration({ duration });
  };

  return {
    data: {
      bgColor: userSettings?.["bg-color"] ?? "",
      alarmSound: userSettings?.["alarm-sound"] ?? "",
      pomoDuration: Number(userSettings?.["pomo-duration"]) ?? 25,
      shortBreakDuration: Number(userSettings?.["short-break-duration"]) ?? 5,
      longBreakDuration: Number(userSettings?.["long-break-duration"]) ?? 15,
    },
    mutations: {
      updateBgColor,
      updatePomoDuration,
    },
    loading: {
      isUserSettingsLoading,
      isBgColorMutating,
    },
  };
}
