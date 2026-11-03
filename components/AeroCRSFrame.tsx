import { Info } from "lucide-react";

/**
 * AeroCRS embed host (brief §9).
 * This is the styled scaffolding that hosts the AeroCRS widget / iframe once
 * credentials are provisioned. Until then it shows a clear "launching shortly"
 * state. Swapping in the real embed requires no page rebuild — drop the
 * <iframe> / script into the marked region below.
 */
export function AeroCRSFrame({
  heading,
  blurb,
  children,
}: {
  heading: string;
  blurb: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-aviation/10 bg-white shadow-card">
      {/* === AeroCRS embed region — replace this block with the provided widget === */}
      <div className="border-b border-aviation/10 bg-aviation/[0.03] px-6 py-4">
        <p className="flex items-center gap-2 text-xs font-medium text-aviation">
          <Info className="h-4 w-4" aria-hidden />
          {heading}
        </p>
      </div>
      <div className="p-6 sm:p-8">
        <p className="max-w-xl text-sm text-muted">{blurb}</p>
        <div className="mt-6">{children}</div>
      </div>
      {/* === end AeroCRS embed region === */}
    </div>
  );
}

export function LaunchingNotice() {
  return (
    <div className="mt-6 rounded-xl border border-dashed border-opportunity/50 bg-opportunity/[0.06] px-5 py-4 text-sm text-ink">
      <strong className="font-semibold text-aviation">Online booking is launching shortly.</strong>{" "}
      In the meantime, please call <a className="font-semibold text-aviation hover:underline" href="tel:+256">+256 (TBC)</a> or
      email <a className="font-semibold text-aviation hover:underline" href="mailto:reservations@flyuganda.com">reservations@flyuganda.com</a> to make a reservation.
    </div>
  );
}
