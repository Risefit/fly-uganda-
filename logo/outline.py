"""
Outlines a text run to a single SVG path, shaped with HarfBuzz (so kerning and
advances are exactly what the typographer intended) and drawn with fontTools.

The result depends on no font at render time — which is the whole point for a
logo. Run with -I; writes JSON to stdout.
"""
import io, json, sys
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Identity
import uharfbuzz as hb

def outline(font_path, text, weight, tracking=0.0):
    """tracking: extra advance per glyph, in font units (1000 upem)."""
    f = TTFont(font_path)
    upem = f["head"].unitsPerEm
    if "fvar" in f:
        axes = {a.axisTag for a in f["fvar"].axes}
        loc = {}
        if "wght" in axes: loc["wght"] = weight
        f = instancer.instantiateVariableFont(f, loc, inplace=False, updateFontNames=False)
    # HarfBuzz cannot parse WOFF2 — drop the compression flavour so save()
    # writes a plain SFNT. Without this every glyph shapes to .notdef.
    f.flavor = None
    buf = io.BytesIO(); f.save(buf); data = buf.getvalue()

    # Shape with HarfBuzz for correct positioning + kerning
    face = hb.Face(data); hbfont = hb.Font(face)
    hbfont.scale = (upem, upem)
    hb.ot_font_set_funcs(hbfont)
    b = hb.Buffer(); b.add_str(text); b.guess_segment_properties()
    hb.shape(hbfont, b, {"kern": True, "liga": True})

    glyph_order = f.getGlyphOrder()
    glyphset = f.getGlyphSet()
    x = 0.0
    parts = []
    for info, pos in zip(b.glyph_infos, b.glyph_positions):
        gname = glyph_order[info.codepoint]
        pen = SVGPathPen(glyphset)
        # y is flipped: font space is y-up, SVG is y-down
        tp = TransformPen(pen, (1, 0, 0, -1, x + pos.x_offset, pos.y_offset))
        glyphset[gname].draw(tp)
        d = pen.getCommands()
        if d: parts.append(d)
        x += pos.x_advance + tracking
    return {"d": " ".join(parts), "advance": x, "upem": upem,
            "ascender": f["hhea"].ascender, "descender": f["hhea"].descender}

if __name__ == "__main__":
    font, text, weight = sys.argv[1], sys.argv[2], float(sys.argv[3])
    tracking = float(sys.argv[4]) if len(sys.argv) > 4 else 0.0
    print(json.dumps(outline(font, text, weight, tracking)))
