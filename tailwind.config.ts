import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      anonymous: ["Anonymous Pro", "monospace"],
    }
  },
  plugins: [],
} satisfies Config;
