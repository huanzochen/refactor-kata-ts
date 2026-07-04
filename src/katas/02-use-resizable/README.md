# Kata 2 — useResizable ⭐⭐

> 這題最貼近你的真實工作：`Sidebar.tsx` 幾乎就是 `chartbutton_demo_/src/components/Home.tsx`
> 的側欄拖曳邏輯。練完可以直接把手法搬回去。

## 味道

拖曳寬度的所有機制 —— `width` 狀態、`isResizing` ref、三個 handler、
掛載/卸載全域 `mousemove`/`mouseup` 的 `useEffect` —— 全糾纏在 component 裡。
想在別處複用這個行為只能複製貼上；`Sidebar` 也被這堆低層事件細節塞滿，看不出重點。

## 任務

把拖曳邏輯抽成一個 custom hook，例如：

```ts
function useResizable(opts: { initial: number; min: number; max: number }): {
  width: number;
  onMouseDown: (e: React.MouseEvent) => void;
};
```

`Sidebar` 變成只描述長相：

```tsx
const { width, onMouseDown } = useResizable({ initial: 250, min: 150, max: 500 });
return (
  <aside data-testid="sidebar" style={{ width }}>
    <div data-testid="resize-handle" onMouseDown={onMouseDown} />
    ...
  </aside>
);
```

## 規則

- **不要動 `Sidebar.test.tsx`。** `data-testid` 要保留，否則測試找不到元素。
- 小步走：先把 hook 抽出來但參數寫死，測試綠了，再把 min/max/initial 參數化。
- `useEffect` 的 cleanup 一定要搬進 hook，別讓事件監聽器外洩。

## 完成的標準

- `npm test` 全綠（含邊界與「放開後不再改變」）。
- `Sidebar` 裡看不到 `useRef` / `addEventListener` 這些低層細節。
- `useResizable` 可以被想像成搬到另一個 component 直接用。

## 提示（卡住再看）

1. 先整段剪下貼進 `useResizable()`，回傳 `{ width, onMouseDown }`，跑測試。
2. 綠了之後，再把 `MIN/MAX/DEFAULT` 換成參數 `opts`。
3. 想想 `useCallback` 的依賴：抽成 hook 後依賴陣列還對嗎？
4. 收尾後打開 `Home.tsx`，你會發現可以用完全一樣的手法。
