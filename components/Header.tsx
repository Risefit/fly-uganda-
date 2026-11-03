"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Search, User } from "lucide-react";
import { NAV } from "@/lib/data";
import { Logo } from "@/components/brand";
import { cn } from "@/lib/utils";

/**
 * Aviation-navy bar, always. Logo left, primary nav centre, Sign In pill and
 * the amber Book pill right — the structure from the identity toolkit's
 * website panel.
 */
export function Header({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const elevated = solid || scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-aviation text-cream transition-shadow duration-300",
        elevated && "shadow-[0_1px_0_rgba(255,164,0,0.35),0_12px_32px_-20px_rgba(11,31,59,0.8)]"
        // NB: no backdrop-filter here. A backdrop-filter ancestor becomes the
        // containing block for position:fixed descendants and collapses the
        // mobile overlay below to 0px.
      )}
    >
      <div className="container-site flex h-[72px] items-center justify-between gap-6">
        {/* No aria-label: the visible wordmark is the accessible name (WCAG 2.5.3). */}
        <Link href="/" className="shrink-0">
          <Logo tone="dark" className="h-9 w-auto sm:h-10" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.primary.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative">
                <button
                  type="button"
                  aria-haspopup="true"
                  className="inline-flex items-center gap-1 py-2 font-display text-[0.78rem] font-semibold text-cream/90 hover:text-opportunity"
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" aria-hidden />
                </button>
                <div className="invisible absolute left-1/2 top-full w-60 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-aviation-700 py-2 shadow-widget">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block px-4 py-2.5 text-sm text-cream/90 hover:bg-white/[0.06] hover:text-opportunity"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 font-display text-[0.78rem] font-semibold text-cream/90 hover:text-opportunity"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/routes"
            aria-label="Search routes"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-cream/80 hover:bg-white/[0.08] hover:text-opportunity"
          >
            <Search className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/pearl-club/account"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 font-display text-[0.72rem] font-semibold uppercase tracking-wide2 text-cream hover:border-opportunity hover:text-opportunity"
          >
            <User className="h-3.5 w-3.5" aria-hidden />
            Sign in
          </Link>
          <Link href="/book" className="btn-primary !px-5 !py-2.5">
            Book a flight
          </Link>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-cream lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 top-[72px] z-40 overflow-y-auto bg-aviation lg:hidden">
          <nav className="container-site flex flex-col py-6" aria-label="Mobile">
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="btn-primary mb-4 w-full !py-3.5 text-center"
            >
              Book a flight
            </Link>
            {NAV.primary.map((item) => (
              <div key={item.href} className="border-b border-white/10">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-display text-lg font-semibold text-cream"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="-mt-1 flex flex-col gap-1 pb-3 pl-4">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setOpen(false)}
                        className="py-1.5 text-sm text-cream/75"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 font-display text-xs font-semibold uppercase tracking-wide2 text-cream/80">
              {NAV.utility.map((u) => (
                <Link key={u.href} href={u.href} onClick={() => setOpen(false)} className="hover:text-opportunity">
                  {u.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
