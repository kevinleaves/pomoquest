import React, { useState } from "react";
import { api } from "~/utils/api";
import type { Unlockable } from "@prisma/client";
import { Snackbar, Alert, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useToggle from "~/features/timer/hooks/useToogle";

interface Props {
  isShopOpen: boolean;
  off: () => void;
}

export default function Shop({ isShopOpen, off }: Props) {
  const [currentlySelected, setCurrentlySelected] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [feedbackStatus, { on: feedbackOn, off: feedbackOff }] = useToggle();

  const ctx = api.useContext();
  const { data: purchasableBGColors, isLoading } =
    api.unlockedSettings.getLockedBGColors.useQuery();

  const { mutate: purchaseItem, isLoading: isPurchasing } =
    api.unlockedSettings.purchaseItem.useMutation({
      onSuccess: () => {
        void ctx.unlockedSettings.getLockedBGColors.invalidate();
      },
    });

  const {
    mutate: subtractCoins,
    isError: subtractIsError,
    error: subtractError,
  } = api.coins.subtractCoins.useMutation({
    onSuccess: () => {
      feedbackOn();
      void ctx.coins.getCoins.invalidate();
    },
    onError: () => {
      feedbackOn();
    },
  });

  function buyItem(item: Unlockable) {
    // logic to buy an item
    /*
    on purchase click,
    grab row's ID
    update purchased to true
    grab item's cost and call removed coins route
    invalidate get queries for shop & settings to "refresh" the page
    */
    const itemId = item.id;
    const amount = Number(item.cost);

    //purchase only if user has >= amount of coins needed for the purchase. this is currently handled in the backend. need to send error messages to the frontend for user feedback
    purchaseItem({ itemId });
    subtractCoins({ amount });
  }

  return isShopOpen ? (
    <div className="h-full overflow-y-auto rounded-xl bg-white p-10 font-publicSans md:fixed md:left-1/2 md:top-1/2 md:h-3/4 md:w-1/2 md:-translate-x-1/2 md:-translate-y-1/2	">
      <div className=" font-publicSans text-2xl font-bold">SHOP</div>
      <Divider className="py-5" textAlign={isMobile ? "left" : "center"}>
        themes
      </Divider>
      {feedbackStatus ? (
        <Snackbar
          open={feedbackStatus}
          autoHideDuration={3000}
          onClose={feedbackOff}
        >
          <Alert severity={subtractIsError ? "error" : "success"}>
            {subtractIsError ? subtractError?.message : "Successful purchase!"}
          </Alert>
        </Snackbar>
      ) : null}

      <button
        className="absolute right-5 top-3 text-2xl  font-normal transition hover:scale-110"
        onClick={off}
      >
        close
      </button>
      <div className="flex h-5/6 w-full flex-col items-center gap-2 rounded-xl">
        {purchasableBGColors
          ?.sort((a, b) => {
            return a.cost - b.cost;
          })
          .map((item, index) => (
            <div
              key={index}
              onClick={() => setCurrentlySelected(index)}
              className={`flex w-full justify-between md:w-5/6 ${
                index === currentlySelected
                  ? "rounded-xl bg-gray-900 text-white"
                  : ""
              }`}
            >
              <button
                className="h-16 w-16 rounded-lg md:h-20 md:w-20"
                style={{ backgroundColor: item.value }}
              ></button>
              <button
                className="transition hover:text-red-500"
                onClick={() => buyItem(item)}
              >
                {item.cost} coins
              </button>
            </div>
          ))}
      </div>
    </div>
  ) : null;
}
