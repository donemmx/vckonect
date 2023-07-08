/** @type {import('tailwindcss').Config} */
export default {
  content: [ './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('../src/assets/bg/hero-bg.png')",
        'account': "url('../src/assets/account/account-bg.png')",
        'card-yellow': "url('../src/assets/bg/yellow-shape-bg.svg')",
        'card-orange': "url('../src/assets/bg/orange-shape-bg.svg')",
        'card-red': "url('../src/assets/bg/light-red-shape-bg.svg')",
        'card-green': "url('../src/assets/bg/green-shape-bg.svg')",
      },
      backgroundColor: {
        'main': '#fbfbfb'
      }
    },
  },
  plugins: [],
}

