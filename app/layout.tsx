import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

/**
 * Fonts are SELF-HOSTED variable woff2 files in app/fonts/ (sourced from
 * @fontsource-variable/{montserrat,source-sans-3}). Deliberately not
 * next/font/google: self-hosting removes a third-party round-trip on slow East
 * African connections, keeps the build working offline and in CI, and avoids
 * sending visitor IPs to Google. To update a face, drop in a new woff2 and keep
 * the variable name. See §5 of PROJECT-HANDOVER.md.
 */

// Source Sans 3 — body copy. Open and highly legible at small sizes.
const body = localFont({
  src: "./fonts/source-sans-3-var.woff2",
  weight: "200 900",
  style: "normal",
  display: "swap",
  variable: "--font-body",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

// Montserrat — display, headings and UI labels. The italic cut ships for
// editorial use; the logo itself is outlined to paths and needs no font.
const display = localFont({
  src: [
    { path: "./fonts/montserrat-var.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/montserrat-var-italic.woff2", weight: "100 900", style: "italic" },
  ],
  display: "swap",
  variable: "--font-display",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fly Uganda — Scheduled domestic flights from Kajjansi",
    template: "%s · Fly Uganda",
  },
  description:
    "Uganda's domestic airline. Scheduled, ticketed flights from Kajjansi Airfield, Kampala to Kihihi, Kisoro, Kasese, Hoima, Bugungu, Arua, Gulu, Moroto, Kidepo and Entebbe.",
  keywords: [
    "Fly Uganda",
    "Uganda domestic flights",
    "Kajjansi airfield flights",
    "fly to Bwindi",
    "Kihihi flights",
    "Uganda safari flights",
    "Gulu flights",
    "Arua flights",
    "Kidepo flights",
    "flights Kampala to Kidepo",
  ],
  openGraph: {
    type: "website",
    siteName: "Fly Uganda",
    title: "Fly Uganda — scheduled domestic flights from Kajjansi",
    description:
      "Scheduled domestic flights from Kajjansi, 30 minutes closer to Kampala than Entebbe. Kihihi, Kisoro, Kasese, Hoima, Arua, Gulu, Moroto, Kidepo and more — daily.",
    url: SITE_URL,
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fly Uganda",
    description: "Uganda's domestic airline — scheduled flights across the country from Kajjansi.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  alternates: {
    canonical: SITE_URL,
    languages: { "fr-FR": "/fr" },
  },
};

export const viewport: Viewport = {
  themeColor: "#2A2824",
  width: "device-width",
  initialScale: 1,
};

// Airline structured data — SEO. Update iataCode/icaoCode once allocated.
const airlineJsonLd = {
  "@context": "https://schema.org",
  "@type": "Airline",
  name: "Fly Uganda",
  alternateName: "FlyUganda",
  url: SITE_URL,
  iataCode: "",
  slogan: "Uganda's domestic airline",
  areaServed: "Uganda and East Africa",
  parentOrganization: {
    "@type": "Organization",
    name: "Kampala Executive Aviation",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Gate 1, Kajjansi Airfield",
    addressLocality: "Kampala",
    addressCountry: "UG",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" dir="ltr" className={`${body.variable} ${display.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-aviation focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(airlineJsonLd) }}
        />
      </body>
    </html>
  );
}
