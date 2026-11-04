import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import fs from "node:fs";
import path from "node:path";

/**
 * Secure-payment strip under the booking window.
 *
 * Scheme marks are trademarks: each is shown from an OFFICIAL asset dropped
 * into /public/payments (visa.svg, mastercard.svg, mtn-momo.svg,
 * airtel-money.svg — obtain them from each scheme's brand centre under its
 * usage terms). Until a file is present, the scheme appears as a plain text
 * badge, so nothing is ever redrawn or approximated.
 */
const SCHEMES = [
  { key: "visa", label: "Visa" },
  { key: "mastercard", label: "Mastercard" },
  { key: "mtn-momo", label: "MTN MoMo" },
  { key: "airtel-money", label: "Airtel Money" },
];
const EXT = [".svg", ".png", ".webp"];

function logoFor(key: string): string | null {
  for (const ext of EXT) {
    const rel = `/payments/${key}${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}

export function PaymentStrip({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <div
      className={
        dark
          ? "flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-2xl bg-aviation-900/80 px-5 py-3 text-cream ring-1 ring-white/10"
          : "flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-2xl bg-white px-5 py-3 text-ink ring-1 ring-aviation/10"
      }
    >
      <p className="flex items-center gap-2 text-xs">
        <ShieldCheck className="h-4 w-4 text-growth-300" aria-hidden />
        <span>
          <span className="font-semibold">Secure payment.</span>{" "}
          <span className={dark ? "text-cream/75" : "text-muted"}>Cards and mobile money, handled in the protected booking flow.</span>
        </span>
      </p>
      <ul className="flex flex-wrap items-center gap-2" aria-label="Accepted payment methods">
        {SCHEMES.map((s) => {
          const logo = logoFor(s.key);
          return (
            <li key={s.key}>
              {logo ? (
                <span className="inline-flex h-8 items-center rounded-md bg-white px-2">
                  <Image src={logo} alt={s.label} width={56} height={20} className="h-5 w-auto" />
                </span>
              ) : (
                <span
                  className={
                    dark
                      ? "inline-flex h-8 items-center rounded-md border border-white/20 px-2.5 text-xs font-semibold tracking-wide text-cream"
                      : "inline-flex h-8 items-center rounded-md border border-aviation/15 px-2.5 text-xs font-semibold tracking-wide text-ink"
                  }
                >
                  {s.label}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
