/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary:'#DAF7A6',
        secondary:'#DAF7A6',
        background:'#ECF0F1',
        border:'#B3B6B7',
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [],
}

