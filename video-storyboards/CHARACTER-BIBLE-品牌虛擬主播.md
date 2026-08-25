# 品牌虛擬主播 — 三站共用（以 MommyStartup A2 為母版）

> ⚠️ 本檔 2026-08-25 依 Vega 既有產線更正。先前版本是在不知道已有產線時寫的，內容已作廢。

---

## 主播母版（沿用 MommyStartup，不另外生新角色）

候選圖與原始 prompt 在 `~/Desktop/MommyStartup虛擬主播候選/`（含 `prompts記錄.md`）。

| 代號 | mediaId | 形象 | 適用 |
|---|---|---|---|
| **A2** ⭐母版 | 39000651 | 亞洲女性・粉色西外＋白T・居家辦公室 | 三站通用 |
| B2 | 39000653 | 亞洲女性・米白麻花針織衫・廚房中島 | 育兒／孕期特別對味 |
| C2 | 39000654 | 亞洲女性・鼠尾草綠襯衫・創作者工作室 | 創業站；育兒題材商務感偏強，少用 |

**A2 原始 prompt（要再生同款時用）：**
```
A friendly Asian woman in her mid 30s, warm genuine smile, shoulder-length soft black hair, wearing a blush-pink blazer over a white tee, sitting in a bright cozy home office with a laptop, plants and warm morning light, looking directly at the camera, professional portrait photo, upper body, vertical composition
```

生成方式：VideoExpress → Create Video From Prompt → Vertical 9:16 → Image Type: Human → Create Image。
選定後 `POST /ai/api/save_generated_image` FormData{uuid} 存入媒體庫取得 mediaId。

---

## 產線（已驗證，不用自己錄音）

**文字驅動 Lipsync HD** — `image2video` 帶 `isTalkingVideoFromText=1`，`speech1` 直接餵英文台詞，
AI 產生語音＋嘴型。英文發音先前已驗證 OK，**不需要 ElevenLabs 或 Voice Changer**。

每支影片 = 3 段台詞 `s1` / `s2` / `s3`，各生一段，再用 `gen.py` 疊字卡、修尾靜音、concat。

**腳本公式（沿用 MommyStartup 已驗證的節奏）：**
- `s1` 鉤子：數字 + 好處，一句話講完
- `s2` 具體：真實例子、真實含義，不空泛
- `s3` CTA：`... on <站台> dot com.`（gen.py 會把它換成可讀網址並標色）

---

## 各站量產資料夾

| 站 | 資料夾 | 狀態 |
|---|---|---|
| mommystartup.com | `~/Desktop/MommyStartup量產-第1批/` | 第 1 批 10 支已完成 |
| baby.chparenting.com | `~/Desktop/Baby量產-第1批/` | manifest + gen.py 已備妥，待生 segs |
| pregnancy.chparenting.com | 待建 | 題材：腿抽筋、孕期咖啡因、NIPT、doula vs midwife |
| learn.chparenting.com | `~/Desktop/Learn站虛擬主播候選/` | **另一套主播與格式，不與本檔混用** |

---

## 內容策略順序

1. **名字類先做** — 零醫療合規風險、短影音最易起量、留言區自帶互動（baby 站有 78 篇）
2. 育兒知識（teething、wonder weeks、growth spurts）— 有粉絲基礎再上
3. 孕期知識 — 完成「懷孕 → 育兒」漏斗

---

## ⚖️ 合規

- 頻道簡介／片尾標示 **AI-generated presenter**；平台後台勾 AI 生成內容標籤
- 網站文章作者仍是 **Vega Lin 本人**（真實身分、真實經歷）→ E-E-A-T 不受影響
- 健康類影片加「資訊參考，請諮詢醫療專業」；不做療效／治癒／保證宣稱
- ❌ 主播形象不可用於「使用者見證」「客戶實例」等會被視為假見證的用途
