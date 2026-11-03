import type { Config } from "tailwindcss";

/**
 * FLY UGANDA — Modern Pan-African brand system.
 *
 * Six brand colours from the identity toolkit, plus the text-safe derivatives
 * the toolkit does not define. Every foreground/background pair used in the UI
 * is WCAG AA at body size — run `npm run contrast` after any change here.
 *
 * TEXT-SAFETY NOTE: three of the six brand colours are NOT legible as body text
 * on the cream ground and exist only as fills:
 *   Opportunity #FFA400  1.67:1  → use opportunity-700 for text
 *   Energy      #D71920  4.35:1  → use energy-700 for text
 *   Connection  #007CBA  3.83:1  → use connection-700 for text
 * Growth #006B4F (5.47:1) and Heritage #7A0019 (9.56:1) are safe as text.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm Neutral — the page ground
        cream: "#F6E9DB",
        paper: "#F6E9DB", // alias
        white: "#FFFCF5",
        warm: "#FFFCF5", // card and panel surfaces

        // Aviation — navigation, footer, dark panels, body text
        aviation: {
          DEFAULT: "#0B1F3B",
          900: "#0B1F3B",
          700: "#122B4E",
          500: "#1A3862",
          100: "#E4E8EF",
        },

        // Opportunity — the primary call to action
        opportunity: {
          DEFAULT: "#FFA400",
          300: "#FFC861", // on dark
          700: "#8A5600", // text on light (5.16:1 on cream)
          900: "#7A4D00",
        },

        // Energy — urgency, alerts, the ribbon's red strand
        energy: {
          DEFAULT: "#D71920",
          300: "#FF6B70", // on dark
          700: "#C2151C", // text on light
        },

        // Heritage — depth and gravitas; the ribbon's darkest strand
        heritage: "#7A0019",

        // Growth — confirmations, sustainability, the ribbon's green strand
        growth: {
          DEFAULT: "#006B4F",
          300: "#4FBF95", // on dark
        },

        // Connection — links to partners, maps, network lines
        connection: {
          DEFAULT: "#007CBA",
          300: "#5FB9E8", // on dark
          700: "#006A9F", // text on light
        },

        // Text
        ink: "#0B1F3B",
        muted: "#5C5244",
        slatey: "#5C5244", // alias

        // Uganda's flag — ceremonial only, in the ribbon and pattern
        flag: {
          black: "#1A1A1A",
          yellow: "#FFA400",
          red: "#D71920",
        },
      },
      fontFamily: {
        // Montserrat for display and UI; Source Sans 3 for body copy.
        // Both self-hosted variable fonts — see app/layout.tsx.
        //
        // "Source Sans 3" MUST carry its own quotes inside the string. Tailwind
        // emits family names unquoted, and an unquoted name ending in a digit
        // is invalid CSS — which silently voids the whole font-family rule on
        // <body> and drops every page to the browser's default serif.
        display: ["var(--font-display)", "Montserrat", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", '"Source Sans 3"', "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { site: "1280px" },
      letterSpacing: {
        kicker: "0.22em",
        wide2: "0.16em",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,31,59,0.06), 0 16px 40px -18px rgba(11,31,59,0.28)",
        widget: "0 10px 44px -14px rgba(11,31,59,0.5)",
        lift: "0 2px 4px rgba(11,31,59,0.06), 0 24px 48px -24px rgba(11,31,59,0.35)",
      },
      backgroundImage: {
        horizon:
          "linear-gradient(180deg,#FFFCF5 0%,#F6E9DB 52%,#F0DFCB 80%,#E8D3B8 100%)",
        // Named distinctly from the `opportunity` colour so `bg-*` is never ambiguous
        "amber-sweep": "linear-gradient(135deg,#FFC861,#FFA400)",
        ribbon:
          "linear-gradient(90deg,#006B4F 0%,#FFA400 34%,#D71920 67%,#7A0019 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
