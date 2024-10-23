const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      "app-dark": {
        extend: "dark", // <- inherit default values from dark theme
        colors: {
          background: "#000",
          foreground: "#FFF",
          primary: {
            50: "#ED7B7B",
            100: "#ED7B7B",
            200: "#ED7B7B",
            300: "#ED7B7B",
            400: "#ED7B7B",
            500: "#ED7B7B",
            600: "#ED7B7B",
            700: "#ED7B7B",
            800: "#ED7B7B",
            900: "#ED7B7B",
            DEFAULT: "#ED7B7B",
            foreground: "#ED7B7B",
          },
          focus: "#F182F6",
        },
        layout: {
          disabledOpacity: "0.3",
          radius: {
            small: "4px",
            medium: "6px",
            large: "8px",
          },
          borderWidth: {
            small: "1px",
            medium: "2px",
            large: "3px",
          },
        },
      },
    },
  })],
};