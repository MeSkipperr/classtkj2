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
        darkBg:'#1e1f30',
        second:'#06a4ff',
        third:'#8756ff',
      },
      maxWidth: {
        '2/4': '50%',    // 2/4 width
        '3/4': '75%',    // 3/4 width
        '8/12': '66.666667%',  // 8/12 width
      },
      maxHeight: {
        '2/4': '50%',    // 2/4 height
        '3/4': '75%',    // 3/4 height
        '8/12': '66.666667%',  // 8/12 height
      },
    },
  },
  plugins: [],
};
export default config;
