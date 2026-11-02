import type { MetadataRoute } from "next";
import { SITE_URL, INDEXABLE } from "@/lib/site";

/**
 * Search engines are blocked EVERYWHERE until indexing is switched on
 * explicitly. Without this, the *.vercel.app deployment is crawlable and Google
 * can index the pre-launch site — placeholder fares and timetable included —
 * under the Fly Uganda name, competing with the real domain.
 *
 * To go live: set SITE_INDEXABLE=true in the Vercel production environment
 * only, and redeploy. See PROJECT-HANDOVER.md §10.
 */
export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
