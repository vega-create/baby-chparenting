#!/usr/bin/env python3
"""12 篇星座命名文的主圖。1200×630。

為什麼要自己做：原本 12 篇用的是 Pexels 的深色太空／火焰／獅子特寫照，
放在這個淺藍米白的育兒站上整組不搭（Vega 反映 Leo 那張獅子臉「有點可怕」），
而且其中 10 張幾乎是同一種銀河夜空、彼此分不出來。
自己畫還有兩個好處：配色跟站上一致、不會像 Pexels 熱連結那樣哪天 404。

用法: python3 gen_zodiac_cover.py [星座英文名 ...]   # 省略則全部產出
"""
import os, math, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

BASE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(BASE), "public", "images", "zodiac")
W, H = 1200, 630

# 取自 src/styles/global.css 與 ToolLayout.astro
BG_TOP  = (241, 247, 253)   # #F1F7FD
BG_BOT  = (230, 240, 251)   # #E6F0FB
NAVY    = (30, 58, 95)      # #1E3A5F
BLUE    = (91, 155, 213)    # #5B9BD5 primary
BLUE_D  = (29, 78, 216)     # #1D4ED8
MUTED   = (107, 123, 145)
PINK    = (240, 178, 196)

# (顯示名, 日期, 星座連線用的點, 邊數)  點座標為 0-1 相對值
SIGNS = {
 "aries":       ("Aries",       "March 21 – April 19",      [(.15,.62),(.34,.42),(.56,.34),(.78,.46)]),
 "taurus":      ("Taurus",      "April 20 – May 20",        [(.12,.34),(.32,.52),(.5,.44),(.7,.56),(.88,.36)]),
 "gemini":      ("Gemini",      "May 21 – June 20",         [(.2,.28),(.24,.6),(.5,.42),(.76,.3),(.8,.62)]),
 "cancer":      ("Cancer",      "June 21 – July 22",        [(.18,.5),(.38,.34),(.58,.5),(.78,.34)]),
 "leo":         ("Leo",         "July 23 – August 22",      [(.14,.5),(.28,.32),(.46,.28),(.6,.44),(.76,.38),(.86,.58)]),
 "virgo":       ("Virgo",       "August 23 – September 22", [(.14,.34),(.3,.5),(.48,.36),(.64,.54),(.84,.44)]),
 "libra":       ("Libra",       "September 23 – October 22",[(.2,.56),(.36,.34),(.6,.34),(.78,.56)]),
 "scorpio":     ("Scorpio",     "October 23 – November 21", [(.12,.36),(.3,.46),(.48,.4),(.66,.52),(.8,.4),(.86,.6)]),
 "sagittarius": ("Sagittarius", "November 22 – December 21",[(.16,.6),(.34,.4),(.54,.46),(.72,.3),(.86,.5)]),
 "capricorn":   ("Capricorn",   "December 22 – January 19", [(.16,.38),(.34,.56),(.56,.5),(.76,.34)]),
 "aquarius":    ("Aquarius",    "January 20 – February 18", [(.14,.44),(.32,.34),(.5,.48),(.68,.34),(.86,.46)]),
 "pisces":      ("Pisces",      "February 19 – March 20",   [(.14,.52),(.3,.36),(.5,.44),(.7,.32),(.86,.5)]),
}

def font(sz, weight="Bold"):
    f = ImageFont.truetype(os.path.join(BASE, "Nunito.ttf"), sz)
    f.set_variation_by_name(weight)
    return f

def build(key):
    name, dates, pts = SIGNS[key]
    img = Image.new("RGB", (W, H), BG_TOP)
    d = ImageDraw.Draw(img)
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)], fill=tuple(int(a+(b-a)*t) for a, b in zip(BG_TOP, BG_BOT)))

    # 柔和光暈
    glow = Image.new("RGB", (W, H), BG_TOP)
    ImageDraw.Draw(glow).ellipse([W*0.55, -H*0.35, W*1.25, H*0.75], fill=(255, 255, 255))
    img = Image.blend(img, glow.filter(ImageFilter.GaussianBlur(90)), 0.45)
    d = ImageDraw.Draw(img)

    # 星座連線：畫在右半邊，左邊留給文字
    px = [(W*0.46 + x*W*0.50, H*0.16 + y*H*0.86) for x, y in pts]
    for a, b in zip(px, px[1:]):
        d.line([a, b], fill=(163, 197, 232), width=3)
    for i, (x, y) in enumerate(px):
        r = 11 if i in (0, len(px)-1) else 7
        d.ellipse([x-r-6, y-r-6, x+r+6, y+r+6], fill=(214, 232, 250))
        d.ellipse([x-r, y-r, x+r, y+r], fill=BLUE)

    # 左側文字
    x = 78
    # 星座名太長(Sagittarius/Capricorn)會撞到右邊的星座連線，自動縮到安全寬度
    fn = font(132, "Black")
    while d.textlength(name, font=fn) > W * 0.44 - x and fn.size > 84:
        fn = font(fn.size - 4, "Black")
    d.text((x, 168 + (132 - fn.size) // 2), name, font=fn, fill=NAVY)
    d.text((x, 322), "BABY NAMES", font=font(56, "Bold"), fill=BLUE_D)
    d.text((x, 404), dates, font=font(34, "SemiBold"), fill=MUTED)
    d.rounded_rectangle([x, 470, x+120, 478], radius=4, fill=BLUE)
    d.rounded_rectangle([x+132, 470, x+188, 478], radius=4, fill=PINK)

    os.makedirs(OUT, exist_ok=True)
    p = os.path.join(OUT, f"{key}.jpg")
    img.save(p, quality=90)
    return p

if __name__ == "__main__":
    keys = sys.argv[1:] or list(SIGNS)
    for k in keys:
        print("✅", build(k))
