import type { Metadata } from "next";
import Link from "next/link";
import { Chip } from "@/components/brand";

export const metadata: Metadata = {
  title: "Version française — bientôt disponible",
  description: "La version française du site de Fly Uganda est en préparation.",
};

// Placeholder for the French experience — the francophone trade (Belgium,
// France, Switzerland, Rwanda, DRC) is the second market for Ugandan safari.
// Full i18n via next-intl is a later step; the layout already uses logical
// properties, so adding locales is structural rather than a rebuild.
export default function FrenchPlaceholder() {
  return (
    <main id="main" lang="fr" className="flex min-h-screen flex-col items-center justify-center bg-aviation px-6 text-center text-cream">
      <Chip className="h-10 w-10 text-opportunity" />
      <h1 className="mt-6 font-display text-3xl font-semibold sm:text-4xl">Version française à venir</h1>
      <p className="mt-4 max-w-md text-cream/80">
        Nous préparons le site de Fly Uganda en français. En attendant, il est disponible en
        anglais, et nos équipes de réservation parlent français.
      </p>
      <Link href="/" lang="en" className="mt-8 rounded-md bg-opportunity px-6 py-3 text-sm font-semibold text-aviation-900 hover:bg-opportunity-300">
        English site
      </Link>
    </main>
  );
}
