#!/usr/bin/env python3
"""名字清單文產生器：讀 scripts/name_posts/<slug>.py 的 POST dict → 產出
src/content/blog/<slug>.md（含 frontmatter、表格、FAQ、JSON-LD）與 public/images/names/<slug>.jpg 封面。

為什麼用產生器：GSC 顯示名字清單頁是 baby 站在 Google 唯一有效的內容；
用同一份模板確保 JSON-LD 作者一律是實際作者 Vega Lin、封面不靠 Pexels 熱連結。

用法: python3 scripts/gen_name_post.py <slug> [<slug> ...]   # 省略則全部
"""
import os, sys, json, glob, importlib.util, random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(BASE)
SITE = "https://baby.chparenting.com"
W, H = 1200, 630
BG_TOP, BG_BOT = (241, 247, 253), (230, 240, 251)
NAVY, BLUE, BLUE_D, MUTED = (30, 58, 95), (91, 155, 213), (29, 78, 216), (107, 123, 145)
ACCENTS = {"pink": (240, 178, 196), "gold": (244, 201, 120), "green": (158, 208, 176), "blue": (163, 197, 232), "lilac": (196, 182, 232)}

def font(sz, weight="Bold"):
    f = ImageFont.truetype(os.path.join(BASE, "Nunito.ttf"), sz); f.set_variation_by_name(weight); return f

def cover(p):
    img = Image.new("RGB", (W, H), BG_TOP); d = ImageDraw.Draw(img)
    for y in range(H):
        t = y / H; d.line([(0, y), (W, y)], fill=tuple(int(a + (b - a) * t) for a, b in zip(BG_TOP, BG_BOT)))
    glow = Image.new("RGB", (W, H), BG_TOP)
    ImageDraw.Draw(glow).ellipse([W * .55, -H * .35, W * 1.25, H * .75], fill=(255, 255, 255))
    img = Image.blend(img, glow.filter(ImageFilter.GaussianBlur(90)), .45); d = ImageDraw.Draw(img)
    acc = ACCENTS[p.get("accent", "blue")]
    rnd = random.Random(p["slug"])
    # 右側：柔和的圓點群（每篇用 slug 當亂數種子，圖案固定但彼此不同）
    for _ in range(16):
        x, y, r = rnd.uniform(W * .56, W * .96), rnd.uniform(H * .10, H * .90), rnd.choice([10, 14, 20, 30, 46])
        col = acc if rnd.random() < .6 else (163, 197, 232)
        soft = tuple(int(c + (255 - c) * .55) for c in col)
        d.ellipse([x - r - 8, y - r - 8, x + r + 8, y + r + 8], fill=soft); d.ellipse([x - r, y - r, x + r, y + r], fill=col)
    x = 78
    fn = font(118, "Black")
    while d.textlength(p["cover_word"], font=fn) > W * .50 - x and fn.size > 64: fn = font(fn.size - 4, "Black")
    d.text((x, 172 + (118 - fn.size) // 2), p["cover_word"], font=fn, fill=NAVY)
    d.text((x, 318), "BABY NAMES", font=font(56, "Bold"), fill=BLUE_D)
    d.text((x, 400), p["cover_sub"], font=font(32, "SemiBold"), fill=MUTED)
    d.rounded_rectangle([x, 466, x + 120, 474], radius=4, fill=BLUE)
    d.text((x, 540), "baby.chparenting.com", font=font(26, "SemiBold"), fill=MUTED)
    out = os.path.join(ROOT, "public", "images", "names"); os.makedirs(out, exist_ok=True)
    img.save(os.path.join(out, p["slug"] + ".jpg"), "JPEG", quality=88, optimize=True)

def table(rows, pron):
    head = "| Name | Gender | Origin | Meaning |" + (" Say it |" if pron else "")
    sep = "|------|--------|--------|---------|" + ("--------|" if pron else "")
    out = [head, sep]
    for r in rows:
        line = f"| {r[0]} | {r[1]} | {r[2]} | {r[3]} |"
        if pron: line += f" {r[4] if len(r) > 4 else ''} |"
        out.append(line)
    return "\n".join(out)

def render(p):
    url = f"{SITE}/blog/{p['slug']}/"; img = f"/images/names/{p['slug']}.jpg"
    body = []
    body += p["intro"]
    body.append(f"> 📌 **Key Takeaway:** {p['takeaway']}")
    body.append(f"![{p['title']}]({img})")
    for s in p["sections"]:
        body.append("## " + s["h"])
        body += s.get("before", [])
        if "rows" in s: body.append(table(s["rows"], any(len(r) > 4 for r in s["rows"])))
        body += s.get("after", [])
    body.append("## FAQ")
    for q, a in p["faq"]: body += ["### " + q, a]
    body.append("## Sources")
    body.append("\n".join("- " + s for s in p["sources"]))
    md_body = "\n\n".join(body)
    words = len(md_body.split())
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "BlogPosting", "@id": url + "#article", "headline": p["title"], "description": p["description"],
         "datePublished": p["date"] + "T00:00:00+08:00", "dateModified": p.get("reviewed", p["date"]) + "T00:00:00+08:00",
         "author": {"@id": SITE + "/author/vega-lin/#person"}, "publisher": {"@id": SITE + "/#organization"},
         "image": {"@type": "ImageObject", "url": SITE + img, "width": W, "height": H},
         "mainEntityOfPage": {"@type": "WebPage", "@id": url}, "wordCount": words, "articleSection": "Names",
         "keywords": p["tags"], "inLanguage": "en-US"},
        {"@type": "Person", "@id": SITE + "/author/vega-lin/#person", "name": "Vega Lin", "jobTitle": "Founder",
         "url": SITE + "/author/vega-lin/",
         "description": "Founder of the CHParenting family of sites and a mother of two, writing practical baby care and baby name guides."},
        {"@type": "Organization", "@id": SITE + "/#organization", "name": "Baby Sleep & Parenting Guide", "url": SITE,
         "logo": {"@type": "ImageObject", "url": SITE + "/favicon.svg", "width": 32, "height": 32}},
        {"@type": "FAQPage", "@id": url + "#faq", "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in p["faq"]]},
        {"@type": "BreadcrumbList", "@id": url + "#breadcrumb", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE},
            {"@type": "ListItem", "position": 2, "name": "Blog", "item": SITE + "/blog/"},
            {"@type": "ListItem", "position": 3, "name": p["title"], "item": url}]}]}
    fm = "\n".join(["---", f'title: {json.dumps(p["title"])}', f'description: {json.dumps(p["description"])}',
        f'publishDate: {p["date"]}'] + ([f'lastReviewed: {p["reviewed"]}'] if p.get("reviewed") else []) + [f'slug: "{p["slug"]}"', 'category: "names"', f'tags: {json.dumps(p["tags"])}',
        'author: "Vega Lin"', f'authorUrl: "{SITE}/author/vega-lin/"', f'image: "{img}"', "draft: false", "---"])
    md = fm + "\n\n" + md_body + "\n\n" + '<script type="application/ld+json">\n' + json.dumps(ld, indent=2, ensure_ascii=False) + "\n</script>\n"
    open(os.path.join(ROOT, "src/content/blog", p["slug"] + ".md"), "w").write(md)
    n = sum(len(s.get("rows", [])) for s in p["sections"])
    # 內鏈檢查：指到不存在的文章就警告
    import re
    for l in set(re.findall(r"\]\(/blog/([^/)]+)/\)", md)):
        if not os.path.exists(os.path.join(ROOT, "src/content/blog", l + ".md")): print(f"   ⚠️ 內鏈不存在: /blog/{l}/")
    return n, words

if __name__ == "__main__":
    slugs = sys.argv[1:] or [os.path.basename(f)[:-3] for f in sorted(glob.glob(os.path.join(BASE, "name_posts", "*.py")))]
    for s in slugs:
        spec = importlib.util.spec_from_file_location(s, os.path.join(BASE, "name_posts", s + ".py"))
        m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
        p = m.POST; p["slug"] = s
        n, w = render(p); cover(p)
        print(f"✅ {s}  {p['date']}  {n} names  {w} words")
