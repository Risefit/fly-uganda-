import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Kicker } from "@/components/brand";
import { NetworkMap } from "@/components/NetworkMap";

/** Homepage network section — the animated map with its route list beside it. */
export function RouteMapPreview() {
  return (
    <section className="bg-cream py-20 sm:py-28" aria-labelledby="map-heading">
      <div className="container-site">
        <NetworkMap
          intro
          heading={
            <div className="mb-10 max-w-3xl">
              <Kicker>The network</Kicker>
              <h2 id="map-heading" className="mt-4 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                Seven destinations, one morning departure bank
              </h2>
              <p className="mt-3 max-w-xl text-muted">
                Every route leaves Kajjansi in the morning and is back before lunch. Click a
                destination for its times — the routes draw at the speed they fly.
              </p>
            </div>
          }
        />
        <div className="mt-8">
          <Link href="/routes" className="btn-primary">
            Explore the network <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
