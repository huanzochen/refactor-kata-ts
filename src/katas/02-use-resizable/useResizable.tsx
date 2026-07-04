import { useCallback, useEffect, useRef, useState } from "react";

const MIN_WIDTH = 150;
const MAX_WIDTH = 500;
const DEFAULT_WIDTH = 250;

export function useResizeable(opts:{initial: number; min: number; max: number;}): {width: number; onMouseDown: (e: React.MouseEvent) => void;}{

      const [width, setWidth] = useState(opts.initial);

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


  return {width, onMouseDown: handleMouseDown}





}