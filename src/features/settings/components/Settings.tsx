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
  return isUserSettingsModalOpen ? (
    <div className="fixed left-1/2 top-1/2 h-3/4 w-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
      <div className="text-8xl">IM A SETTINGS MODAL AND IM OPEN</div>
      <h3 className="text-xl">theme</h3>
      <div className="flex gap-2">
        <button
          onClick={() => updateBgColor("#7950f2")}
          className="h-20 w-20 rounded-lg bg-[#7950f2]"
        ></button>
        <button
          onClick={() => updateBgColor("#099268")}
          className="h-20 w-20 rounded-lg bg-[#099268]"
        ></button>
        <button
          onClick={() => updateBgColor("#f783ac")}
          className="h-20 w-20 rounded-lg bg-[#f783ac]"
        ></button>
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
