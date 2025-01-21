import type { Config } from "tailwindcss";
import daisyui from "daisyui"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          
          "primary": "#91fff4",
                    
          "secondary": "#f1ffab",
                    
          "accent": "#fbd341",
                    
          "neutral": "#f3f4f6",
                    
          "base-100": "#18181b",
                    
          "info": "#006eeb",
                    
          "success": "#00a44b",
                    
          "warning": "#ffb900",
                    
          "error": "#ff6973",
          },
        },
      ],
    },
  plugins: [
    daisyui,
  ],
} satisfies Config;
