// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode using the 'class' strategy
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0A0D14",
          elevated: "#11141C",
          header: "#161923",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#94A3B8",
          muted: "#64748B",
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.06)",
          strong: "#2D3139",
          hover: "rgba(255, 255, 255, 0.1)",
        },
        accent: {
          primary: "#2962FF",
          secondary: "#4895EF",
          muted: "#2962FF15",
        },
        trading: {
          buy: {
            DEFAULT: "#00CA90",
            muted: "#00CA9015",
            hover: "#00E6A0",
          },
          sell: {
            DEFAULT: "#FF3B46",
            muted: "#FF3B4615",
            hover: "#FF4B56",
          },
        },
        status: {
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
          info: "#3B82F6",
        },
      },
      boxShadow: {
        panel: "0 4px 6px -1px rgba(0, 0, 0, 0.5)",
        card: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
      },
      borderRadius: {
        DEFAULT: "6px",
        lg: "8px",
        xl: "12px",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        geistSans: ['var(--font-geist-sans)', 'sans-serif'],
        geistMono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
