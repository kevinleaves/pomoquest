import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { dark } from "@clerk/themes";
import { createTheme, ThemeProvider } from "@mui/material";
import "~/styles/globals.css";

const theme = createTheme({
  typography: {
    fontFamily: ["Public Sans", "sans-serif"].join(","),
  },
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <ClerkProvider
        {...pageProps}
        appearance={{
          baseTheme: dark,
        }}
      >
        <ReactQueryDevtools />
        <Component {...pageProps} />
      </ClerkProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
