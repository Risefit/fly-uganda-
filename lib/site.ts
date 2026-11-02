/**
 * Single source of truth for the canonical URL and whether this deployment is
 * allowed to be indexed.
 *
 * SITE_INDEXABLE is unset by default, so every environment — local, preview and
 * the *.vercel.app production alias — is noindex until someone deliberately
 * turns indexing on for the real domain. Set SITE_INDEXABLE=true in the Vercel
 * production environment when flyuganda.com goes live.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://flyuganda.com";

export const INDEXABLE = process.env.SITE_INDEXABLE === "true";
