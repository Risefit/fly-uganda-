import Link from "next/link";
import { Chip } from "@/components/brand";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-screen flex-col items-center justify-center bg-aviation px-6 text-center text-cream">
      <Chip className="h-10 w-10 text-opportunity" />
      <p className="mt-6 flight-code text-sm uppercase tracking-widest text-opportunity-300">Error 404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">This route isn&rsquo;t on our map</h1>
      <p className="mt-4 max-w-md text-cream/80">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Let&rsquo;s get you back on course.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-md bg-opportunity px-5 py-3 text-sm font-semibold text-aviation-900 hover:bg-opportunity-300">
          Back to home
        </Link>
        <Link href="/routes" className="rounded-md border border-white/25 px-5 py-3 text-sm font-semibold text-cream hover:bg-white/10">
          View routes
        </Link>
      </div>
    </main>
  );
}
