/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Modern formats first — protects LCP on slow mobile connections.
    formats: ["image/avif", "image/webp"],
    // Brand scene plates in /public/scenes are first-party SVG. Serving SVG
    // through next/image needs this flag; the CSP below neutralises scripts
    // and sandboxes the document, which is the documented safe configuration.
    // When real photography replaces /scenes/*.svg, this whole block can go.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Destination photography is served from Unsplash's CDN (see lib/photos.ts).
    // Everything else is first-party. Drop your own files in public/photos/ and
    // they take precedence — at which point this entry can go.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  // robots.txt is advisory; this header is not. Both are lifted together by
  // setting SITE_INDEXABLE=true in the production environment.
  async headers() {
    if (process.env.SITE_INDEXABLE === "true") return [];
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
