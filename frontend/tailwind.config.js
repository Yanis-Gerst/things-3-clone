/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        main: "#23262A",
        sidebar: "#1F2225",
        accentHeader: "#393C3F",
        accentTodoDetail: "#2D3033",
      },
      borderColor: {
        black: "#191B1E",
      },
      colors: {
        content: "#FBFBFB",
        secondaryContent: "#D2D3D3",
        secondaryContentLight: "#EEEEEE",
        tertiaryContent: "#696B6D",
        stroke: "#44464A",
        primary: "#2473E7",
        tag: "#44474A",
        error: "#CD5441",
        accentColor: "#244271",
        deadline: "#F34D61",
      },
      boxShadow: {
        base: "0px 0px 8px 2px rgba(0,0,0,0.2)",
      },
      backgroundImage: {
        checkBoxAtlas:
          "url('../../public/assets/Checkbox-Completing-Atlas-Dark@2x.png')",
      },
    },
  },
  plugins: [],
};
