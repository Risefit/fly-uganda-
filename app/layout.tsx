import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

/**
 * Fonts are SELF-HOSTED variable woff2 files in app/fonts/ (sourced from
 * @fontsource-variable/{fraunces,archivo}). Deliberately not next/font/google:
 * self-hosting removes a third-party round-trip on slow East African
 * connections, keeps the build working offline/in CI, and avoids sending
 * visitor IPs to Google. To update a face, drop in a new woff2 and keep the
 * variable name. See §5 of PROJECT-HANDOVER.md.
 */

// Archivo — body + UI, wide-tracked micro-labels, strong tabular figures
// for timetables and fare tables.
const body = localFont({
  src: "./fonts/archivo-var.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-body",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

// Fraunces — warm high-contrast display serif for headings and the wordmark.
const display = localFont({
  src: "./fonts/fraunces-var.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-display",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fly Uganda — Scheduled safari flights from Kajjansi",
    template: "%s · Fly Uganda",
  },
  description:
    "Uganda's safari airline. Scheduled seats from Kajjansi Airfield, Kampala to Bwindi, Queen Elizabeth, Murchison Falls and Kidepo — plus charter across Uganda and East Africa.",
  keywords: [
    "Fly Uganda",
    "Uganda domestic flights",
    "Kajjansi airfield flights",
    "fly to Bwindi",
    "Kihihi flights",
    "Uganda safari flights",
    "Murchison Falls flights",
    "Kidepo flights",
    "Uganda charter flights",
  ],
  openGraph: {
    type: "website",
    siteName: "Fly Uganda",
    title: "Fly Uganda — The Pearl, from above",
    description:
      "Scheduled safari seats from Kajjansi, 30 minutes closer to Kampala than Entebbe. Bwindi, Queen Elizabeth, Murchison Falls and Kidepo — daily.",
    url: SITE_URL,
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fly Uganda",
    description: "The Pearl, from above. Uganda's safari airline.",
  },
  icons: {
    icon: [{ url: "/pearl.svg", type: "image/svg+xml" }],
  },
  alternates: {
    canonical: SITE_URL,
    languages: { "fr-FR": "/fr" },
  },
};

export const viewport: Viewport = {
  themeColor: "#07251F",
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
  slogan: "The Pearl, from above",
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
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-nile focus:px-4 focus:py-2 focus:text-paper"
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
