/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.html",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.ts",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        "gray-1": "#EAEAEA",
        "green-1": "#118632",
        "green-border-1": "#98D4A9",
      },
    },
  },
  plugins: [],
};
