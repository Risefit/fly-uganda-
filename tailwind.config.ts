import type { Config } from "tailwindcss";

/**
 * FLY UGANDA — "The Crested Crane" brand system.
 *
 * Source Green for depth and the Victoria Nile, Crane Gold for the national
 * bird's crest, Savannah Linen for light ground, Equator Clay for sparing heat.
 *
 * Every token name is semantic, not literal, so a future palette swap is a
 * one-file change. Every foreground/background pair below is WCAG AA at body
 * size — see scripts/contrast.js and §5 of PROJECT-HANDOVER.md before editing.
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
        // Papyrus White replaces stark white everywhere
        white: "#FFFEFA",
        paper: "#F4F1E6", // Savannah Linen — page background
        ivory: "#F4F1E6",
        warm: "#FFFEFA", // cards/surfaces

        // Crane Gold is the primary accent
        gold: {
          DEFAULT: "#D2A017", // Crane Gold
          300: "#F0CF72", // Crest Light — on dark
          600: "#7A590F", // Deep Gold — text on light (5.69:1 on paper)
          900: "#5E4309",
        },

        // Equator Clay — laterite earth, the crane's cheek patch. Used sparingly.
        amber: {
          DEFAULT: "#B54A24", // 4.68:1 on paper
          300: "#E08A5F", // on dark
        },

        // `nile` is Source Green — the Victoria Nile rises in Uganda. Dark
        // contrast sections, footer, booking panel.
        nile: {
          DEFAULT: "#07251F", // Source Green
          900: "#07251F",
          700: "#0D3A31",
          500: "#175145",
          100: "#EDE7D2", // warm light fill (pair with gold-600)
        },
        midnight: {
          DEFAULT: "#07251F",
          2: "#0D3A31",
        },

        // Text
        ink: "#0F1D19", // Forest Ink
        slatey: "#6B6453", // warm taupe secondary

        // Semantic success — confirmations, credits, "earned" states.
        // 5.75:1 on paper. Deliberately NOT a flag colour: the flag is
        // ceremonial and appears only in the FlagBand.
        success: {
          DEFAULT: "#1A6B43",
          600: "#15603B",
        },

        // Uganda's flag — full strength only, in thin ceremonial bands
        flag: {
          black: "#1A1A1A",
          yellow: "#FCDC04",
          red: "#D90429",
        },
      },
      fontFamily: {
        // Fraunces for display/headings/wordmark; Archivo for body/UI.
        // Both self-hosted variable fonts — see app/layout.tsx.
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { site: "1280px" },
      letterSpacing: {
        kicker: "0.32em",
        wide2: "0.24em",
      },
      boxShadow: {
        // Warm umbra only — never grey-black
        card: "0 1px 2px rgba(122,89,15,0.06), 0 16px 40px -18px rgba(122,89,15,0.26)",
        widget: "0 10px 44px -14px rgba(7,37,31,0.48)",
      },
      backgroundImage: {
        "pearl-sky":
          "linear-gradient(180deg,#FFFEFA 0%,#F4F1E6 46%,#EDE7D2 76%,#E3D9B4 100%)",
        gold: "linear-gradient(135deg,#F0CF72,#D2A017)",
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
