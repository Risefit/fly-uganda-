# Your own destination photos go here

Drop a file named after the airport code and rebuild. It replaces the stock photo for
that destination everywhere on the site, with no code change:

    hukj.jpg   Kajjansi        khx.jpg   Kihihi         kxo.jpg   Kisoro
    humw.jpg   Mweya           kse.jpg   Kasese         paf.jpg   Pakuba
    hugg.jpg   Bugungu         hukd.jpg  Kidepo         ebb.jpg   Entebbe

`.jpg`, `.jpeg`, `.png` and `.webp` all work. Landscape orientation, at least 1600 px
wide; next/image handles the resizing. Aerials from the aircraft are exactly what this
slot is for.

The resolution order is in `lib/photos.ts`.

## fleet/

KEA's own photography, copied from flykea.com (first-party — no licence to clear).
`c208ex*.jpg` and `b1900*.jpg` are referenced from `FLEET` in `lib/data.ts` and the
cargo page. Replace like for like; keep the file names.
