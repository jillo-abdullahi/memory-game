/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: { DEFAULT: "#FDA214", 100: "#FFB84A" },
        blue: {
          50: "#DFE7EC",
          100: "#FCFCFC",
          200: "#F2F2F2",
          300: "#BCCED9",
          400: "#6395B8",
          500: "#7191A5",
          600: "#304859",
          700: "#152938",
        },
      },
      borderRadius: {
        "1.5lg": "0.625rem", // 10px
        "2.5lg": "1.25rem", // 20px
        "3.5lg": "1.875rem", // 30px
        "4.5lg": "2.5rem", // 40px
      },
      fontFamily: {
        atkinson: ["atkinson", "sans-serif"],
      },
    },
  },
  plugins: [],
};
