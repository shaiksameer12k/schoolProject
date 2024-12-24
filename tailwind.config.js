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
        logoTextColor:"#ffcc2a"
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
      screens: {
        // Custom breakpoints

        sm: "640px", // Small devices (portrait phones)
        md: "768px", // Medium devices (tablets)
        lg: "1024px", // Large devices (laptops)
        xl: "1280px", // Extra large devices (desktops)
        "2xl": "1536px", // Very large devices (large desktops)

        // You can also define custom breakpoints, for example:
        xs: "0px", // Custom breakpoint for extra small devices
        "lg-max": { max: "1024px" }, // You can also use `max` width to target devices less than 1024px
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
