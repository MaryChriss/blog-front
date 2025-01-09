import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-fundo': "radial-gradient(circle, rgba(255,145,35,1) 0%, rgba(255,255,255,1) 87%)",
      },
    },
  },
  plugins: [],
}
export default config
