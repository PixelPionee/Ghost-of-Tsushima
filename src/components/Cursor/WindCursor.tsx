import { useRef, useEffect } from 'react';
import { useWindCursor } from '../../hooks/useWindCursor';
import './WindCursor.css';

interface WindCursorProps {
  enabled?: boolean;
  showCursor?: boolean; 
  cursorSize?: 'small' | 'normal'; 
}

export function WindCursor({ 
  enabled = true, 
  showCursor = true,
  cursorSize = 'normal'
}: WindCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const { isMoving } = useWindCursor({
    enabled,
    canvasRef,
  });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !enabled) return;

    const updateCursorPosition = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    window.addEventListener('mousemove', updateCursorPosition);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
    };
  }, [enabled]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !enabled) return;

    const handleMouseDown = () => {
      cursor.classList.add('clicking');
    };

    const handleMouseUp = () => {
      cursor.classList.remove('clicking');
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>

      <canvas
        ref={canvasRef}
        className="wind-cursor-canvas"
        aria-hidden="true"
      />

      {showCursor && (
        <div
          ref={cursorRef}
          className={`custom-cursor ${isMoving ? 'moving' : ''} ${cursorSize === 'small' ? 'small' : ''}`}
          aria-hidden="true"
        >
          <div className="cursor-inner" />
          <div className="cursor-outer" />
        </div>
      )}
    </>
  );
}
