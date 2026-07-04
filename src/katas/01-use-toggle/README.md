# Kata 1 — useToggle（暖身）⭐

## 味道

`Panel.tsx` 有三個布林開關，每個都重複同一份 `useState(...)` + `(v) => !v` 邏輯。

## 任務

抽出一個 custom hook：

```ts
function useToggle(initial: boolean): [boolean, () => void] { ... }
```

然後用它改寫 `Panel`，例如：

```tsx
const [wifi, toggleWifi] = useToggle(false);
```

## 規則

- **不要動 `Panel.test.tsx`。**
- 每抽一個開關就跑一次測試，保持綠燈，不要三個一起改。
- hook 放哪都行（同檔案內或 `useToggle.ts`），命名以能表達意圖為準。

## 完成的標準

- `npm test` 全綠。
- `Panel` 裡不再有重複的 `(v) => !v`。
- 你能一句話說出 `useToggle` 的職責。

## 提示（卡住再看）

1. 先只抽 Wi-Fi 一個，跑測試綠了，再抽第二個。
2. hook 回傳 tuple `[value, toggle]`，呼叫端才好解構命名。
3. 進階：讓它也回傳 `setValue`，變成 `[value, toggle, setValue]`。
