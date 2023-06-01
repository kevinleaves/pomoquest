import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        lessBrutal: "2px 3px 0px Black",
        brutal: "4px 6px 0px Black",
      },
    },
    fontFamily: {
      lexend: ["Lexend Mega", "sans-serif"],
      publicSans: ["Public Sans", "sans-serif"],
      archivo: ["Archivo Black", "sans-serif"],
    },
  },
  plugins: [],
} satisfies Config;
