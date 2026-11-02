import { Clock, ShieldCheck, HandHeart, Network } from "lucide-react";
import { PROMISES } from "@/lib/data";
import { Kicker, PearlMark } from "@/components/brand";

const ICONS = [Clock, ShieldCheck, HandHeart, Network];

export function WhyFlyUs() {
  return (
    <section className="bg-paper py-20 sm:py-28" aria-labelledby="why-heading">
      <div className="container-site">
        <div className="max-w-2xl">
          <Kicker>Why fly with us</Kicker>
          <h2 id="why-heading" className="mt-4 font-serif text-3xl leading-tight tracking-wide text-ink sm:text-4xl">
            Bush-strip aircraft, airline discipline
          </h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-gold/15 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <div key={p.title} className="group flex flex-col bg-warm p-7 transition-colors hover:bg-white">
                <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold-600">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="flex items-start gap-1.5 font-serif text-lg tracking-wide text-ink">
                  <PearlMark className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" />
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slatey">{p.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
