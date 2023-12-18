import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EAB308",
        light: "rgb(226 232 240)",
        lighty: "rgb(148 163 184)",
        mid: "rgb(71 85 105)",
        darky: "rgb(30 41 59)",
        dark: "rgb(15 23 42)",
      },
    },
  },
  plugins: [],
};
export default config;
