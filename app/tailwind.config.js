module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    darkMode: "class",
    extend: {
      height: {
        "60vh": "60vh",
        "70vh": "70vh",
        "80vh": "80vh",
        ringColor: {
          'transparent': 'transparent',
        },
        ringWidth: {},
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindui/react"),
  ],
};
