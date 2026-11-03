import { NetworkMap } from "@/components/NetworkMap";
import { PLANNED_CITIES } from "@/lib/data";

/** Routes page — lands straight on Uganda, no Africa intro. */
export function RouteMapFull() {
  return (
    <div>
      <NetworkMap intro={false} />
      <p className="mt-4 text-xs text-muted">
        <span className="font-semibold text-aviation">Partner links:</span>{" "}
        {PLANNED_CITIES.join(", ")}. To be offered through interline and codeshare partners, or under development — no dates committed.
      </p>
    </div>
  );
}
