import { useState, useRef, useEffect, useCallback } from 'react';

const MIN_WIDTH = 150;
const MAX_WIDTH = 500;
const DEFAULT_WIDTH = 250;

/**
 * 味道：可拖曳寬度的側欄。
 * 拖曳邏輯（useState + useRef + 三個 handler + useEffect 掛/卸全域事件）
 * 全部糾纏在 component 裡。想在別的頁面複用這個拖曳行為？只能複製貼上。
 *
 * 註：這幾乎就是 chartbutton_demo_ 的 Home.tsx 側欄邏輯。練完可直接搬回去用。
 */
export function Sidebar() {
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const isResizing = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;
    setWidth(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, e.clientX)));
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <aside data-testid="sidebar" style={{ width }}>
      <div data-testid="resize-handle" onMouseDown={handleMouseDown} />
      <p>sidebar content</p>
    </aside>
  );
}
