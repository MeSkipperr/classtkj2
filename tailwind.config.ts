import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        primary: '#fff',
        trans:'#ffffffcc',
        transDark:'#202025cc',
        dark:'#000',
        darkBg:'#202025',
        second:'#06a4ff',
        third:'#8756ff',
      },
    },
  },
  plugins: [],
};
export default config;
