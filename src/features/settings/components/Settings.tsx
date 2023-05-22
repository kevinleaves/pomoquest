import React from "react";
import Button from "~/features/common/components/Button";
import { api } from "~/utils/api";

interface Props {
  isUserSettingsModalOpen: boolean;
  off: () => void;
  updateBgColor: (hexValue: string) => void;
}

export default function Settings({
  isUserSettingsModalOpen,
  off,
  updateBgColor,
}: Props) {
  const { data: possibleBGColors } =
    api.unlockedSettings.getUnlockedBGColors.useQuery();

  return isUserSettingsModalOpen ? (
    <div className="rounded-xl bg-white p-10 md:fixed md:left-1/2 md:top-1/2 md:h-3/4 md:w-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
      <div className="text-8xl">IM A SETTINGS MODAL AND IM OPEN</div>
      <h3 className="text-xl">theme</h3>
      <div className="flex gap-2">
        {possibleBGColors?.map((color) => (
          <button
            key={color.id}
            onClick={() => updateBgColor(color.value)}
            className="h-20 w-20 rounded-lg"
            style={{ backgroundColor: color.value }}
          ></button>
        ))}
      </div>
      <div className="flex"></div>
      <div className="flex"></div>
      <div className="flex"></div>

      <button
        className="absolute right-0 top-0 text-4xl transition hover:scale-110"
        onClick={off}
      >
        close
      </button>
    </div>
  ) : null;
}
