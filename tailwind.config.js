const tailwindColors = require("tailwindcss/colors");

// This method generates all the dynamic color classes from Tailwind and
// ensures that they are included in the generated CSS.
//
// TODO: This is probably not very performant.
//
const staticColorSet = () => {
  const colorSafeList = [];

  // Skip these to avoid a load of deprecated warnings when tailwind starts up
  const deprecated = [
    "lightBlue",
    "warmGray",
    "trueGray",
    "coolGray",
    "blueGray",
  ];

  for (const colorName in tailwindColors) {
    if (deprecated.includes(colorName)) {
      continue;
    }

    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

    const pallette = tailwindColors[colorName];

    if (typeof pallette === "object") {
      shades.forEach((shade) => {
        if (shade in pallette) {
          colorSafeList.push(`text-${colorName}-${shade}`);
          colorSafeList.push(`bg-${colorName}-${shade}`);
        }
      });
    }
  }
  return colorSafeList;
};

module.exports = {
  safelist: staticColorSet(),
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
};
