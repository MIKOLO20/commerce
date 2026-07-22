import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#000035",
        inkHover: "#0a0040",
      },
      boxShadow: {
        premium: "0 20px 60px -15px rgba(0, 0, 53, 0.25)",
        card: "0 2px 10px rgba(0, 0, 0, 0.06)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
