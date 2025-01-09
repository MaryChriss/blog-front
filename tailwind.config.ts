import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px",  
        xmd: "375px",  
        xlg: "424px",
      },
      backgroundImage: {
        'login-fundo': "radial-gradient(circle, rgba(230,120,40,1) 0%, rgba(255,255,255,1) 35%)",
      },
    },
  },
  plugins: [],
}
export default config
