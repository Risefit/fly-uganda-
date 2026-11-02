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
    // No remote image hosts: every image is first-party and version-controlled.
    remotePatterns: [],
  },
};

module.exports = nextConfig;
