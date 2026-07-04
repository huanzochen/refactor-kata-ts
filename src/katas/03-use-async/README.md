# Kata 3 — 用 useReducer 消滅不合法狀態 ⭐⭐⭐

## 味道

`UserCard.tsx` 用三個獨立的 `useState`：`user` / `loading` / `error`。
它們互相牽動卻沒有任何約束，型別上允許一堆不該存在的組合
（例如同時有 error 又還在 loading）。狀態轉換散在 `then/catch/finally`，
很難說清楚「這個畫面到底有哪幾種合法狀態」。

## 任務

把這三個狀態收斂成**一個**明確的狀態機。兩條路擇一（建議先做 A）：

**A. 在 component 內用 `useReducer`**

```ts
type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; user: User }
  | { status: 'error'; message: string };
```

用一個 reducer 處理 `start` / `success` / `failure` 三個 action。
不合法的組合從此在型別上就無法表示。

**B. 進階：抽成通用 hook `useAsync<T>(fn)`**
回傳 `{ status, data, error }`，讓 `UserCard` 只負責 render。

## 規則

- **不要動 `UserCard.test.tsx`。**
- 保留 `cancelled` 的清理邏輯（避免元件卸載後 setState）。
- 對外可見行為（Loading / Hello, X / Error: X）完全不變。

## 完成的標準

- `npm test` 全綠。
- 畫面狀態由單一 `status` 欄位決定，render 段落是清爽的 `switch`。
- 你講得出「這個元件有哪 4 種狀態、彼此怎麼轉換」。

## 提示（卡住再看）

1. 先在原地把三個 `useState` 換成一個 `useReducer`，render 段仍用舊變數
   （從 state 解構出來）過渡，跑測試綠了再收尾。
2. reducer 是純函式 —— 你甚至可以另外對它寫單元測試（不用 render）。
3. 做到 B 之後，這個 `useAsync` 在真實專案裡到處都能用。
