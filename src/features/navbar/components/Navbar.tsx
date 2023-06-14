import React from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import StoreIcon from "@mui/icons-material/Store";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";

interface Props {
  isUserSettingsModalOpen: boolean;
  toggleUserSettings: React.Dispatch<React.SetStateAction<boolean>>;
  isShopOpen: boolean;
  toggleShop: React.Dispatch<React.SetStateAction<boolean>>;
  coinAmount: number | undefined;
}

export default function Navbar({
  isUserSettingsModalOpen,
  toggleUserSettings,
  coinAmount,
  isShopOpen,
  toggleShop,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className="flex h-16 w-full flex-wrap items-center justify-around border-b-2 border-black bg-[#FFFFFF] p-2 md:h-16 md:justify-between">
      <h1 className="text-2xl font-extrabold text-black md:text-3xl">
        pomoquest
      </h1>
      <div className="flex gap-2 md:gap-5">
        <SignedIn>
          {isMobile ? (
            <Button
              variant="contained"
              onClick={() => toggleUserSettings(!isUserSettingsModalOpen)}
              color="secondary"
              size="small"
              className="drop-shadow-lessBrutal"
              startIcon={<DisplaySettingsIcon />}
              sx={{
                minWidth: "1rem",
                "& .MuiButton-startIcon": { marginRight: "0px" },
              }}
            ></Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => toggleUserSettings(!isUserSettingsModalOpen)}
              color="secondary"
              size="small"
              className="drop-shadow-lessBrutal"
              startIcon={<DisplaySettingsIcon />}
            >
              settings
            </Button>
          )}

          {isMobile ? (
            <Button
              variant="contained"
              onClick={() => toggleShop(!isShopOpen)}
              color="primary"
              size="small"
              className="drop-shadow-lessBrutal"
              startIcon={<StoreIcon />}
              sx={{
                minWidth: "1rem",
              }}
            >
              {coinAmount?.toLocaleString()}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => toggleShop(!isShopOpen)}
              color="primary"
              size="small"
              className="drop-shadow-lessBrutal"
              startIcon={<StoreIcon />}
            >
              Shop: {coinAmount?.toLocaleString()} coins
            </Button>
          )}
        </SignedIn>
        <SignedOut>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            href="/login"
            className="drop-shadow-lessBrutal"
          >
            login
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton
            afterSignOutUrl={"https://pomoquest.vercel.app/"}
            appearance={{
              elements: {
                userButtonTrigger: "rounded-md drop-shadow-lessBrutal",
                avatarBox: "rounded-md",
              },
            }}
          />
        </SignedIn>
      </div>
    </div>
  );
}
