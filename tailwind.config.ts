import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        'dark-blue': {
          '50': '#f1f3ff',
          '100': '#e6eaff',
          '200': '#d0d7ff',
          '300': '#aab3ff',
          '400': '#7a83ff',
          '500': '#4446ff',
          '600': '#281fff',
          '700': '#180df4',
          '800': '#130acd',
          '900': '#130bad',
          '950': '#040372',
        },
      }
    }
  }
}