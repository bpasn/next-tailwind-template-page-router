import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors:{
      'primary': {
        '50':  '#f2fbfa',
        '100': '#d5f2ef',
        '200': '#9adfd9',
        '300': '#79cfcb',
        '400': '#4db4b2',
        '500': '#339999',
        '600': '#27787a',
        '700': '#236062',
        '800': '#204d4f',
        '900': '#1e4243',
        '950': '#0c2527',
    },
    
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
