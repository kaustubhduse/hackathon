/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        custom: '0px 6px 12px 0px rgba(221, 230, 237, 1)', // Custom shadow
      },
    },
  },
  plugins: [],
}