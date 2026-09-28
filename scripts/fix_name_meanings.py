#!/usr/bin/env python3
"""校對既有名字文的含義。讀 scripts/name_fixes/<slug>.py 的 ROWS / PROSE，改表格列與內文。

ROWS: { 舊名字: (新名字或None, 性別或None, 來源或None, 含義) }  —— None 表示不變
PROSE: [(舊字串, 新字串), ...]  —— 內文與 JSON-LD 會一起替換（JSON-LD 內的雙引號已跳脫，兩種都試）
跑完會列出「已被換掉、但內文還提到」的名字，方便補 PROSE。

用法: python3 scripts/fix_name_meanings.py <slug> [...]
"""
import sys, os, re, json, importlib.util
BASE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(BASE)

def run(slug):
    spec = importlib.util.spec_from_file_location(slug.replace("-", "_"), os.path.join(BASE, "name_fixes", slug + ".py"))
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    path = os.path.join(ROOT, "src/content/blog", slug + ".md"); t = open(path).read()
    lines = t.split("\n"); done = set(); removed = []
    for i, l in enumerate(lines):
        if not l.startswith("| ") or l.startswith("| Name") or l.startswith("|--"): continue
        c = [x.strip() for x in l.strip().strip("|").split("|")]
        if len(c) < 4 or c[0] not in m.ROWS: continue
        new, gender, origin, meaning = m.ROWS[c[0]]
        if new and new != c[0]: removed.append(c[0])
        done.add(c[0])
        c[0] = new or c[0]; c[1] = gender or c[1]; c[2] = origin or c[2]
        c[3] = '"' + meaning.replace('"', "'") + '"' if c[3].startswith('"') else meaning
        lines[i] = "| " + " | ".join(c) + " |"
    t = "\n".join(lines)
    for a, b in getattr(m, "PROSE", []):
        n = t.count(a)
        ea, eb = json.dumps(a)[1:-1], json.dumps(b)[1:-1]
        if ea != a: n += t.count(ea); t = t.replace(ea, eb)
        t = t.replace(a, b)
        if n == 0: print(f"   ⚠️ PROSE 找不到: {a[:50]}")
    open(path, "w").write(t)
    miss = [k for k in m.ROWS if k not in done]
    if miss: print("   ⚠️ 表格裡找不到:", miss)
    prose = "\n".join(l for l in t.split("\n") if not l.startswith("| "))
    left = [(n, [s.strip()[:150] for s in re.split(r"(?<=[.!?])\s+", prose) if re.search(r"\b" + re.escape(n) + r"\b", s)][:3]) for n in removed]
    left = [(n, s) for n, s in left if s]
    for mm in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', t, re.S): json.loads(mm.group(1))
    print(f"✅ {slug}: 改 {len(done)} 列（其中換掉 {len(removed)} 個名字）" + ("" if not left else "\n   內文仍提到已換掉的名字："))
    for n, s in left: print(f"     - {n}: {s[0]}")

if __name__ == "__main__":
    for s in sys.argv[1:]: run(s)
