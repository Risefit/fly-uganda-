"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { NAV } from "@/lib/data";
import { Wordmark } from "@/components/brand";
import { cn } from "@/lib/utils";

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
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const elevated = solid || scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        elevated ? "bg-paper/95 backdrop-blur shadow-[0_1px_0_rgba(201,162,39,0.5)]" : "bg-paper/70 backdrop-blur-sm"
      )}
    >
      {/* Utility bar */}
      <div className="hidden border-b border-gold/20 lg:block">
        <div className="container-site flex h-9 items-center justify-between text-[0.7rem] text-ink/70">
          <span className="webale text-[0.7rem]">Webale — welcome aboard</span>
          <div className="flex items-center gap-5">
            {NAV.utility.map((u) => (
              <Link key={u.href} href={u.href} className="uppercase tracking-wide2 hover:text-gold-600">
                {u.label}
              </Link>
            ))}
            <a href="tel:+256" className="inline-flex items-center gap-1.5 hover:text-gold-600">
              <Phone className="h-3.5 w-3.5" aria-hidden /> +256 (TBC)
            </a>
            <div className="flex items-center gap-1 text-ink/50">
              <span className="font-semibold text-ink" aria-current="true">EN</span>
              <span aria-hidden>·</span>
              <Link href="/fr" className="hover:text-gold-600" lang="fr">FR</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-site flex h-16 items-center justify-between lg:h-[68px]">
        <Link href="/" aria-label="Fly Uganda — home">
          <Wordmark tone="light" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.primary.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative">
                <button className="inline-flex items-center gap-1 py-2 text-[0.72rem] font-medium uppercase tracking-wide2 text-ink hover:text-gold-600">
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" aria-hidden />
                </button>
                <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <div className="overflow-hidden rounded-lg border border-gold/20 bg-warm py-2 shadow-card">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block px-4 py-2.5 text-sm text-ink hover:bg-gold/[0.08] hover:text-gold-600"
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
                className="py-2 text-[0.72rem] font-medium uppercase tracking-wide2 text-ink hover:text-gold-600"
              >
                {item.label}
              </Link>
            )
          )}
          <Link href="/book" className="btn-primary !px-5 !py-2.5">Book</Link>
        </nav>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 top-16 z-40 overflow-y-auto bg-paper lg:hidden">
          <nav className="container-site flex flex-col py-6" aria-label="Mobile">
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="btn-primary mb-4 w-full !py-3.5 text-center"
            >
              Book a flight
            </Link>
            {NAV.primary.map((item) => (
              <div key={item.href} className="border-b border-gold/15">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-serif text-lg tracking-wide text-ink"
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
                        className="py-1.5 text-sm text-ink/70"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-6 flex items-center gap-6 text-xs uppercase tracking-wide2 text-ink/70">
              {NAV.utility.map((u) => (
                <Link key={u.href} href={u.href} onClick={() => setOpen(false)} className="hover:text-gold-600">
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
