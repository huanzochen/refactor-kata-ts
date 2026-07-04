import { useCallback, useEffect, useRef, useState } from 'react';

export function useResizable(opts: { initial: number; min: number; max: number }): {
  width: number;
  isResizing: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
} {
  const [width, setWidth] = useState(opts.initial);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      setWidth(Math.min(opts.max, Math.max(opts.min, e.clientX)));
    },
    [opts.min, opts.max]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [handleMouseMove, handleMouseUp]
  );

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return { width, isResizing, onMouseDown: handleMouseDown };
}
