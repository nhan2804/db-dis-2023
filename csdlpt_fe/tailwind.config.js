// const ar = require("@tailwindcss/aspect-ratio");s
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}", "./index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          gradient: "linear-gradient(150.78deg,#00EB42 0%,#169900 186.94%)",
          solid: "#00B649",
        },
        secondary: {
          green: "#E8F5F2",
          "green-mess": "#CAEDDD",
          "light-gray": "#DEDEED",
          black: "#000000",
        },
        status: {
          notice: "#D72815",
          accept: "#68D1A2",
          active: "#739EF1",
          wait: "#FBC04A",
        },
        neutral: {
          "semi-white": "#F9FAFF",
          "light-gray": "#DEDEED",
          "medium-gray": "#C7C6D6",
          gray: "#9494B0",
          "dark-gray": "#575773",
          "white-gray": "#EDEEF5",
        },
        primary2: "#E63946",
        secondary1: "#F1FAEE",
        secondary2: "#A8DADC",
        secondary3: "#457B9D",
        thirdary: {
          normal: "#fa541c",
          selected: "#fff2e8",
          hover: "#ff7a45",
          click: "#d4380d",
        },
        dark: {
          bg: "#303030",
          "bg-neutral": "#424242",
        },
      },
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      serif: ["Merriweather", "serif"],
      actor: ["Actor", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms")({ strategy: "base" }),
    require("@tailwindcss/line-clamp"),
  ],
};
