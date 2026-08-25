# 三站統一形象圖 — 生成 Prompt 全集

> 同一張臉，跨 mommystartup / baby / pregnancy 三站 + 影片 + 社群。
> 搭配 [CHARACTER-BIBLE-品牌虛擬主播.md](./CHARACTER-BIBLE-品牌虛擬主播.md) 使用。

---

## ⚠️ 最重要：先做「母版臉」，不然臉會每張都不一樣

純文字 prompt **無法**保證 11 張圖是同一個人。正確流程：

1. **先只生 STEP 1 的母版頭像**，多生幾張，挑一張最滿意的存成 `master-face.png`
2. **之後每一張都要掛這張母版當角色參考**：
   - Midjourney：`--cref <母版圖網址> --cw 100`
   - VideoExpress：用 Stylize Character 上傳母版
   - 其他工具：找 "character reference / face reference / consistent character" 功能
3. 每次仍然把下方 prompt **完整貼上**（臉部描述不可省略、不可寫 "same woman as before"）

**臉部鎖定段（每張都原封不動照貼）：**

```
a photorealistic Asian woman in her early 30s, shoulder-length dark brown hair with soft natural waves parted slightly to one side, warm brown eyes, light natural makeup with soft pink lips, gentle genuine smile, warm and approachable presence
```

---

## STEP 1 — 母版頭像（先生這張！三站作者頭像共用）

> 用途：三站 `public/images/authors/vega-lin.jpg`、社群大頭貼、Podcast 封面
> 建議比例：1:1

```
Portrait of a photorealistic Asian woman in her early 30s, shoulder-length dark brown hair with soft natural waves parted slightly to one side, warm brown eyes, light natural makeup with soft pink lips, gentle genuine smile, warm and approachable presence, wearing a cream ivory soft knit sweater, clean softly blurred warm beige background, even soft studio lighting, looking directly at the camera, head and shoulders framing, photorealistic portrait photography, shallow depth of field, warm color grading, square 1:1 composition
```

---

# 💼 mommystartup.com — 創業站（無小孩）

## MS-1 · 書桌前工作（about hero 用）

```
a photorealistic Asian woman in her early 30s, shoulder-length dark brown hair with soft natural waves parted slightly to one side, warm brown eyes, light natural makeup with soft pink lips, gentle genuine smile, warm and approachable presence, wearing a cream ivory chunky knit sweater, sitting at a light wood desk typing on a silver laptop, pastel sticky notes on the wall behind her, a stack of blush pink notebooks beside the laptop, bright home office with a sunlit window on the right, golden natural light, photorealistic lifestyle photography, shallow depth of field, warm pink and cream color grading, horizontal 4:3 composition
```

## MS-2 · 靠窗喝咖啡思考

```
a photorealistic Asian woman in her early 30s, shoulder-length dark brown hair with soft natural waves parted slightly to one side, warm brown eyes, light natural makeup with soft pink lips, gentle genuine smile, warm and approachable presence, wearing a soft blush pink knit cardigan, holding a warm ceramic mug with both hands and looking thoughtfully out of a bright window, cozy home corner with a linen armchair and a small potted plant, soft morning light, photorealistic lifestyle photography, shallow depth of field, warm cream and blush color grading, horizontal 3:2 composition
```

## MS-3 · 手寫規劃（部落格配圖用）

```
a photorealistic Asian woman in her early 30s, shoulder-length dark brown hair with soft natural waves parted slightly to one side, warm brown eyes, light natural makeup with soft pink lips, gentle genuine smile, warm and approachable presence, wearing a light grey soft knit top, writing in an open notebook at a light wood table with a laptop and a mug nearby, planner pages and a small vase of dried flowers on the table, bright airy room with soft window light, photorealistic lifestyle photography, shallow depth of field, warm neutral color grading, horizontal 16:9 composition
```

## MS-4 · 影片主播鏡位（創業主題 · 直式）

```
a photorealistic Asian woman in her early 30s, shoulder-length dark brown hair with soft natural waves parted slightly to one side, warm brown eyes, light natural makeup with soft pink lips, gentle genuine smile, warm and approachable presence, wearing a cream ivory chunky knit sweater, sitting on a soft cream sofa in a bright home office, looking directly at the camera and speaking, a blurred desk with a laptop and pastel sticky notes in the background, medium close-up framed from chest up, golden natural window light from the left, photorealistic portrait photography, shallow depth of field, warm color grading, vertical 9:16 composition
```

---

# 🍼 baby.chparenting.com — 育兒站（可有寶寶）

## BB-1 · 抱著新生兒

```
a photorealistic Asian woman in her early 30s, shoulder-length dark brown hair with soft natural waves parted slightly to one side, warm brown eyes, light natural makeup with soft pink lips, gentle genuine smile, warm and approachable presence, wearing a cream ivory soft knit sweater, gently holding a sleeping newborn baby wrapped in a soft cream knit swaddle against her chest, looking down at the baby with a tender expression, softly lit nursery with a white crib and blush pink accents behind her, warm morning window light, photorealistic lifestyle photography, shallow depth of field, warm cream and blush color grading, horizontal 4:3 composition
```

## BB-2 · 陪寶寶在地墊上玩

```
a photorealistic Asian woman in her early 30s, shoulder-length dark brown hair with soft natural waves parted slightly to one side, warm brown eyes, light natural makeup with soft pink lips, gentle genuine smile, warm and approachable presence, wearing a light grey soft knit top, sitting cross-legged on a cream play mat and smiling at a baby doing tummy time in front of her, soft wooden baby toys scattered nearby, bright living room with sheer curtains and warm daylight, photorealistic lifestyle photography, shallow depth of field, warm neutral color grading, horizontal 3:2 composition
```

## BB-3 · 影片主播鏡位（育兒主題 · 直式）

```
a photorealistic Asian woman in her early 30s, shoulder-length dark brown hair with soft natural waves parted slightly to one side, warm brown eyes, light natural makeup with soft pink lips, gentle genuine smile, warm and approachable presence, wearing a cream ivory chunky knit sweater, sitting on a soft cream sofa in a bright living room, looking directly at the camera and speaking, a blurred nursery corner with a white crib and a wooden moon mobile in the background, medium close-up framed from chest up, golden natural window light from the left, photorealistic portrait photography, shallow depth of field, warm color grading, vertical 9:16 composition
```

---

# 🤰 pregnancy.chparenting.com — 孕期站

## PG-1 · 孕肚、手放腹部

```
a photorealistic Asian woman in her early 30s, shoulder-length dark brown hair with soft natural waves parted slightly to one side, warm brown eyes, light natural makeup with soft pink lips, gentle genuine smile, warm and approachable presence, visibly pregnant wearing a soft cream ribbed maternity dress, both hands resting gently on her pregnant belly, standing near a bright window in a calm bedroom with sheer curtains, soft golden natural light, photorealistic lifestyle photography, shallow depth of field, warm blush and cream color grading, horizontal 4:3 composition
```

## PG-2 · 孕期在沙發上放鬆閱讀

```
a photorealistic Asian woman in her early 30s, shoulder-length dark brown hair with soft natural waves parted slightly to one side, warm brown eyes, light natural makeup with soft pink lips, gentle genuine smile, warm and approachable presence, visibly pregnant wearing a soft blush pink knit maternity top, sitting comfortably on a cream sofa with a cushion supporting her back, reading an open book with one hand resting on her belly, a mug of tea on the side table, warm afternoon light through sheer curtains, photorealistic lifestyle photography, shallow depth of field, warm cream color grading, horizontal 3:2 composition
```

## PG-3 · 影片主播鏡位（孕期主題 · 直式）

```
a photorealistic Asian woman in her early 30s, shoulder-length dark brown hair with soft natural waves parted slightly to one side, warm brown eyes, light natural makeup with soft pink lips, gentle genuine smile, warm and approachable presence, wearing a soft blush pink knit top, sitting on a cream sofa in a calm bright living room, looking directly at the camera and speaking, softly blurred background with a linen cushion and a small vase of dried flowers, medium close-up framed from chest up, golden natural window light from the left, photorealistic portrait photography, shallow depth of field, warm color grading, vertical 9:16 composition
```

---

## 📁 生完之後放哪

| 圖 | 存放位置 |
|---|---|
| STEP 1 母版頭像 | 三站都放 `public/images/authors/vega-lin.jpg`（覆蓋現有） |
| MS-1 | `~/mommystartup/public/images/about-hero.png`（覆蓋現有） |
| MS-2 / MS-3 | `~/mommystartup/public/images/` 自訂檔名 |
| BB-1 | `baby-chparenting/public/images/about/vega-portrait.jpg`（覆蓋現有） |
| BB-2 | `baby-chparenting/public/images/about/` |
| PG-1 | `pregnancy-chparenting/public/images/about/vega-pregnant.png`（覆蓋現有） |
| PG-2 | `pregnancy-chparenting/public/images/about/vega-writing.png`（覆蓋現有） |
| MS-4 / BB-3 / PG-3 | 影片用，上傳到 VideoExpress 媒體庫 |

生好丟給我，我幫你放進各站、確認尺寸與 alt 文字，然後一起 push。

---

## ⚖️ 合規備忘

- 這些是 **Vega Lin 本人的 AI 形象**，身分、經歷、學歷全部真實 → E-E-A-T 沒問題
- 影片端要標示 `AI-generated presenter · Written and reviewed by Vega Lin`
- 網站端不需特別標示（形象圖屬品牌視覺，不是宣稱實拍新聞照）
- ❌ 不要用這些圖去做「使用者見證」「客戶實例」等會被視為假見證的用途
