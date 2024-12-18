/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        iconLightGray: "#a3abb8",
        iconHoverColor: "#ff1f59",
        linkColor: "#1ca0dc",
        primaryTextColor: "#ff8383",
      },

      backgroundColor: {
        customDarkBgColor: "#2c1944",
        customActiveBgColor: "#ececec",
        customlightGrayBgColor: "#d3d3d330",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Default sans-serif font
        serif: ["Merriweather", "serif"], // Default serif font
        roboto: ["Roboto", "sans-serif"], // Added Roboto
        mulish: ["Mulish", "sans-serif"], // Added Mulish (formerly Muli)
        poppins: ["Poppins", "sans-serif"], // Added Poppins
        montserrat: ["Montserrat", "sans-serif"], // Added Montserrat
        openSans: ["Open Sans", "sans-serif"], // Added Open Sans
        raleway: ["Raleway", "sans-serif"], // Added Raleway
        lato: ["Lato", "sans-serif"], // Added Lato
      },
      zIndex: {
        "-1": "-1",
        1: "1",
        2: "2",
        10: "10",
        50: "50",
        100: "100",
        1000: "1000",
      },
      boxShadow: {
        "lg-dark":
          "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1)",
        "inner-light": "inset 0 0 10px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
