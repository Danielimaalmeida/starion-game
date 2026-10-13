"""Turn a photo into a sticker like the ones on the board: the object cut out,
a thick white outline and a soft shadow, on a transparent background.

    python3 tools/make_sticker.py PHOTO OUT.png X Y W H

X Y W H is a box (in photo pixels) around the object; GrabCut separates it
from the background inside that box. Needs opencv-python-headless and Pillow.
"""
import sys

import cv2
import numpy as np
from PIL import Image, ImageFilter

MAX_SIDE = 640


def cut(img, rect):
    mask = np.zeros(img.shape[:2], np.uint8)
    bg, fg = np.zeros((1, 65), np.float64), np.zeros((1, 65), np.float64)
    cv2.grabCut(img, mask, rect, bg, fg, 8, cv2.GC_INIT_WITH_RECT)
    m = np.where((mask == 1) | (mask == 3), 255, 0).astype(np.uint8)
    k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, k)
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, k, iterations=2)
    n, labels, stats, _ = cv2.connectedComponentsWithStats(m)   # keep the biggest piece only
    if n > 1:
        m = np.where(labels == 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA]), 255, 0).astype(np.uint8)
    holes = m.copy()                                              # fill gaps inside the outline
    ff = np.zeros((m.shape[0] + 2, m.shape[1] + 2), np.uint8)
    cv2.floodFill(holes, ff, (0, 0), 255)
    return m | cv2.bitwise_not(holes)


def sticker(photo, rect):
    img = cv2.imread(photo)
    m = cut(img, rect)
    side = max(img.shape[:2])
    border, pad = max(6, side // 45), max(16, side // 18)
    img = cv2.copyMakeBorder(img, pad, pad, pad, pad, cv2.BORDER_REPLICATE)
    m = cv2.copyMakeBorder(m, pad, pad, pad, pad, cv2.BORDER_CONSTANT, value=0)
    soft = cv2.GaussianBlur(m, (0, 0), 1.2)
    k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * border + 1, 2 * border + 1))
    outline = cv2.GaussianBlur(cv2.dilate(m, k), (0, 0), 1.5)

    h, w = m.shape
    rgb = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    shadow = Image.fromarray(outline).filter(ImageFilter.GaussianBlur(border * 0.9)).point(lambda v: int(v * 0.35))
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    out.paste(Image.new("RGBA", (w, h), (40, 50, 70, 255)), (0, border // 2), shadow)
    out.paste(Image.new("RGBA", (w, h), (255, 255, 255, 255)), (0, 0), Image.fromarray(outline))
    out.paste(rgb, (0, 0), Image.fromarray(soft))
    out = out.crop(out.getbbox())
    out.thumbnail((MAX_SIDE, MAX_SIDE))
    return out


if __name__ == "__main__":
    photo, dst = sys.argv[1], sys.argv[2]
    x, y, w, h = (int(v) for v in sys.argv[3:7])
    s = sticker(photo, (x, y, w, h))
    s.save(dst, optimize=True)
    print(dst, s.size)
