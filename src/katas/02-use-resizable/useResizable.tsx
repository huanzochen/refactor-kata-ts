import { useCallback, useEffect, useState } from 'react';

export function useResizable(opts: { initial: number; min: number; max: number }): {
  width: number;
  isResizing: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
} {
  const [width, setWidth] = useState(opts.initial);
  const [isResizing, setIsResizing] = useState(false);

  // 1. 按下時，單純改變狀態就好，不碰任何 DOM API
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  // 2. 宣告式：根據目前的狀態 (isResizing) 自動決定要不要掛載監聽器
  useEffect(() => {
    // 沒有在拖曳就不掛載
    if (!isResizing) return;

    // 在這個 effect 裡面定義 handlers，因為它們可以拿到最新的 opts (min/max)
    const handleMouseMove = (e: MouseEvent) => {
      setWidth(Math.min(opts.max, Math.max(opts.min, e.clientX)));
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // 統一在這裡 cleanup！
    // 只要 isResizing 變成 false，或是元件被卸載，React 就會自動執行這段。
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, opts.min, opts.max]);

  return { width, isResizing, onMouseDown: handleMouseDown };
}
