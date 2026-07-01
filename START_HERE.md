# START HERE — 重構練習的起點筆記

> 這份檔案是給「下次回來玩」的自己看的。讀完這頁就能接著練，不用重讀對話。

---

## 我為什麼在練這個（背景）

我是 React 開發者，會加功能，但**不太會重構**。我發現自己：

1. **傾向「完全理解 100% 功能後」才敢重構。** 所以只有自己剛寫完的 code 好重構；
   一旦是接在別人的 component 上、看不懂全貌，就沒信心動、也不想折騰。
2. **E2E / 測試不足**，很難證明重構前後功能有沒有被改壞。

## 這次學到最重要的一個觀念

> **重構不是「完全理解 → 打掉重寫」。**
> **重構是一套讓你能安全修改「你沒有完全理解、也不敢動」的程式碼的技術。**

它靠兩根支柱：

- **測試安全網** —— 先讓行為被測試釘住，看不懂也能動；改壞的當下測試會變紅告訴你。
- **小步前進** —— 每次只做一個有名字的機械化動作，改完立刻跑測試，綠了才做下一步。

我「只有剛寫完的 code 好重構」，是因為那時腦中就是安全網。練習的目的，是讓我學會
**用測試當安全網，而不是用腦袋**——這樣才敢動別人的 code。

---

## Kata 是什麼

Kata（型）源自武術，指反覆練習的固定招式套路，練到變肌肉記憶。
Code Kata = 小而明確、可反覆練的程式題目。**重點在過程與紀律，不在答案。**
同一題可以練好幾次，每次專注在不同手法上。

---

## 這個 repo 是什麼

React 19 + TypeScript + Vitest 的重構練習場。4 個 kata，每題都附**已經綠燈的測試當安全網**。
規則只有一條：**改 code、不改測試、保持綠燈。** 測試變紅 = 我改壞了行為，退回去。

| # | 資料夾 | 練什麼 | 難度 |
|---|--------|--------|------|
| 1 | `src/katas/01-use-toggle`    | 抽出第一個 custom hook（暖身） | ⭐ |
| 2 | `src/katas/02-use-resizable` | 把糾纏的 `useState/useEffect/useRef` 抽成 hook（**對應真實工作 Home.tsx 的側欄拖曳**） | ⭐⭐ |
| 3 | `src/katas/03-use-async`     | 用 `useReducer` 讓「不合法狀態」無法表示 | ⭐⭐⭐ |
| 4 | `src/katas/04-legacy-cart`   | **先補特徵化測試、再安全重構**（對應「不敢動別人 code」的卡點） | ⭐⭐⭐⭐ |

每個資料夾裡有自己的 `README.md`，寫清楚味道、任務、規則、漸進提示。

---

## 怎麼開始（每次回來都這樣）

```bash
cd /Users/huangtz/code/refactor-ts
npm install       # 第一次才需要
npm test          # 先確認全綠 —— 這是起點
```

然後：

1. 打開該題的 `README.md`，讀「味道」和「任務」。
2. 照這個節奏做：
   ```
   跑測試看綠 → 找一個味道 → 用一個有名字的手法動它
   → 一小步 → 存檔 → 再跑測試
        綠 → 繼續下一步
        紅 → undo 回上一個綠燈點，想清楚再來
   ```
3. **建議 `git init` 並在每個綠燈點 commit**，這樣「改壞就 undo 回上一個綠燈」最順。

## 常用手法（Fowler 簡版）

- **Extract Function / Hook** — 把邏輯抽成有名字的函式或 custom hook
- **Rename** — 爛名字改成說得出意圖的名字
- **Replace Nested Conditional** — 巢狀 if 換成 early return / switch
- **Consolidate State** — 多個互相牽動的 `useState` 併成一個 `useReducer`

## 一條重要紀律

**不要「順手」改行為。** 看到疑似 bug，先讓它留著、保持綠燈完成重構，之後再另開一步修。
重構（不改行為）與改行為，永遠分開做。

---

## 練完之後：套回真實專案 chartbutton_demo_

- `Home.tsx` 的 `formatModified` → 抽出來寫單元測試（kata 1 手法）
- `Home.tsx` 的側欄拖曳邏輯 → 抽成 `useResizable`（kata 2 手法，幾乎一模一樣）
- 已經有的 Playwright 視覺快照（`e2e_test/`）就是 UI 版安全網：重構前先確認快照綠，改完再比對

## 想對答案時

跟 Claude 說「**第 N 題我改成這樣，幫我 review**」，貼上我的版本。
它會針對我的寫法給回饋，而不是直接給解答（自己走過手法才會長肌肉）。

## 搭配閱讀（O'Reilly 上都有）

- **《Working Effectively with Legacy Code》— Michael Feathers** — 對應 kata 4 的心法：
  怎麼在看不懂、沒測試的 code 上建 seam、補特徵化測試再改。**先讀這本。**
- **《Refactoring》2nd Edition — Martin Fowler** — 當手法字典查（範例正好是 JavaScript）。
