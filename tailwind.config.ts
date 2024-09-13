import { Body } from "#build/components"

const animate = require("tailwindcss-animate")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}',
  ],
  prefix: "",
  theme: {
    fontFamily: {
      body: ['"PT Sans"', "sans-serif"],
      button: ['"Inter"', "sans-serif"],
      heading: ['"Domine"', "serif"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        arapawa: {
          '50': '#f1f3ff',
          '100': '#e6eaff',
          '200': '#d0d7ff',
          '300': '#aab3ff',
          '400': '#7a83ff',
          '500': '#4446ff',
          '600': '#281fff',
          '700': '#180df4',
          '800': '#130acd',
          '900': '#120ba7',
          '950': '#040372',
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
}