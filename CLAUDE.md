# 存檔入口（SAVE FILE）— 重構練習場

> 這是「存檔」。用 Claude Code 或其他 code 工具打開這個資料夾時，先讀這裡就能接著玩。

## 這是什麼

一個 **React 19 + TypeScript + Vitest 的重構練習場（code kata）**。使用者是 React 開發者，
正在練「重構」這個技能。這不是真實產品，是刻意設計來反覆練習的題目。

**完整背景、觀念、玩法、進度，全部寫在 [`START_HERE.md`](START_HERE.md) —— 請先讀那份。**

## 給 AI 助手的重點提示

- 使用者用**繁體中文（zh-TW）**溝通。
- 核心觀念:重構 = 用測試當安全網、小步安全修改「看不懂的 code」,不是「先懂 100% 再重寫」。
- 規則:**改 code、不改測試、保持綠燈**。測試變紅代表行為被改壞。
- 當使用者說「第 N 題我改成這樣,幫我 review」時:**針對他的版本給回饋,不要直接給解答**
  (自己走過手法才會長肌肉)。
- 4 題在 `src/katas/`,各自有 README。每題主軸是 hook / 狀態管理。

## 快速開始

```bash
npm install     # 第一次才需要
npm test        # 先確認全綠 —— 這是起點
```

進度追蹤:建議 `git init` 後,在每個綠燈點 commit,當作「還原點」。
（可以在這裡手動記錄目前練到第幾題、卡在哪。）

## 目前進度

- [ ] Kata 1 — use-toggle
- [ ] Kata 2 — use-resizable
- [ ] Kata 3 — use-async
- [ ] Kata 4 — legacy-cart

（練完一題就把 `[ ]` 改成 `[x]`,下次一眼看到進度。）
