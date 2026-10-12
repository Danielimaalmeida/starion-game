"""Crop board exports down to just the sticker.

The PNGs exported from the FigJam board contain the sticker plus the info box
underneath it ("+IR001 / Description: ...") and wide white margins. The game
already prints the code and the name, so it only needs the sticker.

    python3 tools/crop_stickers.py            # img/*.png -> img/crop/*.png

Originals are left untouched. Images without an info box are only trimmed.
"""
import glob
import os
import sys

from PIL import Image

SRC = sys.argv[1] if len(sys.argv) > 1 else "img"
DST = os.path.join(SRC, "crop")
MAX_SIDE = 640          # plenty for an on-screen card, keeps files small


def box_top(gray, w, h):
    """First row of the info box: a long run of dark border pixels."""
    px = gray.load()
    for y in range(h):
        dark = sum(1 for x in range(0, w, 2) if px[x, y] < 90)
        if dark * 2 > w * 0.35:
            return y
    return None


def main():
    os.makedirs(DST, exist_ok=True)
    for path in sorted(glob.glob(os.path.join(SRC, "*.png"))):
        im = Image.open(path).convert("RGBA")
        w, h = im.size
        flat = Image.new("RGB", im.size, "white")
        flat.paste(im, mask=im.getchannel("A"))
        gray = flat.convert("L")

        top = box_top(gray, w, h)
        bottom = top - int(h * 0.02) if top else h
        # content = anything that is not (almost) white
        ink = gray.crop((0, 0, w, bottom)).point(lambda v: 255 if v < 236 else 0)
        bbox = ink.getbbox()
        if not bbox:
            print("skip (empty):", path)
            continue
        pad = int(max(bbox[2] - bbox[0], bbox[3] - bbox[1]) * 0.04)
        bbox = (max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(w, bbox[2] + pad), min(bottom, bbox[3] + pad))
        out = im.crop(bbox)
        out.thumbnail((MAX_SIDE, MAX_SIDE))
        name = os.path.basename(path)
        out.save(os.path.join(DST, name), optimize=True)
        print(f"{name}: box at {top}, crop {bbox} -> {out.size}")


if __name__ == "__main__":
    main()
