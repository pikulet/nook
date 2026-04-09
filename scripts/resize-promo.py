"""Resize promo images by fitting inside target dimensions with white padding."""
from PIL import Image
import os

PROMO_DIR = "./promo"

def fit_with_padding(src_path, out_path, target_w, target_h):
    img = Image.open(src_path)
    img.thumbnail((target_w, target_h), Image.LANCZOS)
    canvas = Image.new("RGB", (target_w, target_h), (255, 255, 255))
    x = (target_w - img.width) // 2
    y = (target_h - img.height) // 2
    canvas.paste(img, (x, y))
    canvas.save(out_path)
    print(f"  {out_path} ({target_w}x{target_h})")

jobs = [
    ("forest-desk-original.png", "screenshot-1.png", 1280, 800),
    ("night-sky-settings-original.png", "screenshot-2.png", 1280, 800),
    ("decoration-picker-original.png", "screenshot-3.png", 1280, 800),
    ("forest-desk-original.png", "small-promo-440x280.png", 440, 280),
    ("night-sky-settings-original.png", "large-promo-920x680.png", 920, 680),
    ("forest-desk-original.png", "marquee-1400x560.png", 1400, 560),
]

for src, out, w, h in jobs:
    fit_with_padding(os.path.join(PROMO_DIR, src), os.path.join(PROMO_DIR, out), w, h)

print("Done")
