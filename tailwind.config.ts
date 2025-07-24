import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        text: {
          'blue-light': '#2DC5FF',
          blue: '#00A1F8',
          'gray-dark': '#333333',
          'gray-darker': '#212121',
        },
      },
      maxWidth: {
        content: 'var(--content-width)',
      },
    },
  },
  plugins: [],
}
export default config
