/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // ページコンポーネントの対象
    "./components/**/*.{js,ts,jsx,tsx}", // コンポーネントの対象
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
