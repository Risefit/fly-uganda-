import fs from "node:fs";
import path from "node:path";

/**
 * Destination photography — one image per strip, resolved in this order:
 *
 *   1. YOUR OWN PHOTO, if `public/photos/<code>.jpg` (or .jpeg/.png/.webp)
 *      exists. Drop a file in, rebuild, done. No code change. This is the
 *      slot for KEA's own aerials — nothing on a stock site has photographed
 *      Bugungu from a Caravan on short final.
 *
 *   2. The licensed Unsplash photo below. Every one was verified against its
 *      own metadata (description + location field) to be the place it claims.
 *      All are under the Unsplash License (free for commercial use, no
 *      attribution required); none are Unsplash+ (paid) images. We credit
 *      anyway, on the destination page — it costs nothing and removes doubt.
 *
 * Codes match lib/data.ts. Served through Unsplash's CDN with imgix params —
 * hotlinking is how Unsplash intends its images to be used.
 */
export type Photo = {
  src: string;
  alt: string;
  credit?: { name: string; url: string; source: "Unsplash" };
  /** True for a genuine aerial/elevated view. */
  aerial?: boolean;
  own?: boolean;
};

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=78`;

const STOCK: Record<string, Photo> = {
  HUKJ: {
    src: U("photo-1741012254499-fd90b2015605"),
    alt: "Green hills and smallholdings outside Kampala — the country the Caravan climbs out over",
    credit: { name: "Michael Starkie", url: "https://unsplash.com/@starkie_pics", source: "Unsplash" },
  },
  HUKH: {
    src: U("photo-1620148878899-7c9b16ce9651"),
    alt: "Mountain gorillas in Bwindi Impenetrable Forest — ninety minutes from Kajjansi",
    credit: { name: "Ylenia Vimercati Molano", url: "https://unsplash.com/@ylenia_vimercati", source: "Unsplash" },
  },
  HUKI: {
    src: U("photo-1551357141-f73a8402ceb3"),
    alt: "Lake Bunyonyi from the air — the terraced hills on the approach to Kisoro",
    credit: { name: "Random Institute", url: "https://unsplash.com/@randominstitute", source: "Unsplash" },
    aerial: true,
  },
  HUKS: {
    src: U("photo-1583140310426-9187b6489be3"),
    alt: "The Rwenzori Mountains at sunset, seen from the Fort Portal side",
    credit: { name: "Itote Rubombora", url: "https://unsplash.com/@itote", source: "Unsplash" },
  },
  HUGG: {
    src: U("photo-1652440308509-60fecbb007c2"),
    alt: "Looking down the valley to the Nile from the escarpment above Bugungu",
    credit: { name: "Jonathan Göhner", url: "https://unsplash.com/@jochieng1", source: "Unsplash" },
    aerial: true,
  },
  HUKD: {
    src: U("photo-1667817418453-3489bb60ce9b"),
    alt: "The Narus Valley, Kidepo Valley National Park, near Apoka",
    credit: { name: "Mark Nsubuga", url: "https://unsplash.com/@marknsubuga", source: "Unsplash" },
  },
  HUEN: {
    src: U("photo-1570053279529-9f2b1003c57c", 2000),
    alt: "The water's edge on Lake Victoria at Entebbe",
    credit: { name: "bill wegener", url: "https://unsplash.com/@wegener", source: "Unsplash" },
  },
};

const EXT = [".jpg", ".jpeg", ".png", ".webp"];

/** Resolve the photo for an airport code. Runs at build time (pages are static). */
export function photoFor(code: string, fallbackAlt: string): Photo {
  for (const ext of EXT) {
    const rel = `/photos/${code.toLowerCase()}${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) {
      return { src: rel, alt: fallbackAlt, own: true, aerial: true };
    }
  }
  return STOCK[code] ?? { src: `/scenes/${code.toLowerCase()}.svg`, alt: fallbackAlt };
}
