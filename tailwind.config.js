/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
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
        },
        accent: {
          primary: "#2962FF",
          secondary: "#4895EF",
        },
        trading: {
          buy: {
            DEFAULT: "#00CA90",
            muted: "#00CA9015",
          },
          sell: {
            DEFAULT: "#FF3B46",
            muted: "#FF3B4615",
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
        panel: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
        card: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
      },
      borderRadius: {
        DEFAULT: "6px",
        lg: "8px",
        xl: "12px",
      },
    },
  },
  plugins: [],
};
