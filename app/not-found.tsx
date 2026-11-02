import Link from "next/link";
import { PearlMark } from "@/components/brand";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-nile px-6 text-center text-paper">
      <PearlMark className="h-10 w-10 text-gold" />
      <p className="mt-6 flight-code text-sm uppercase tracking-widest text-gold-300">Error 404</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">This route isn&rsquo;t on our map</h1>
      <p className="mt-4 max-w-md text-paper/80">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Let&rsquo;s get you back on course.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-md bg-gold px-5 py-3 text-sm font-semibold text-nile-900 hover:bg-gold-300">
          Back to home
        </Link>
        <Link href="/routes" className="rounded-md border border-white/25 px-5 py-3 text-sm font-semibold text-paper hover:bg-white/10">
          View routes
        </Link>
      </div>
    </main>
  );
}
