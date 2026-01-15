import { useEffect, useRef, useCallback } from 'react';
import type { MousePosition } from '../types/tsushima.types';
import {
  calculateMouseSpeed,
  spawnParticles,
  updateParticle,
  drawParticle,
  cleanupDeadParticles,
  particlePool,
  throttle,
} from '../utils/particlePhysics';

interface UseWindCursorOptions {
  enabled?: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

interface UseWindCursorReturn {
  mousePosition: MousePosition;
  isMoving: boolean;
}

export function useWindCursor({
  enabled = true,
  canvasRef,
}: UseWindCursorOptions): UseWindCursorReturn {
  const mouseRef = useRef<MousePosition>({
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
  });

  const isMovingRef = useRef(false);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(Date.now());

  const updateMousePosition = useCallback((e: MouseEvent) => {
    mouseRef.current.prevX = mouseRef.current.x;
    mouseRef.current.prevY = mouseRef.current.y;
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;

    const speed = calculateMouseSpeed(mouseRef.current);
    isMovingRef.current = speed > 0.5;

    if (enabled) {
      spawnParticles(mouseRef.current, speed);
    }
  }, [enabled]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const now = Date.now();
    const deltaTime = now - lastTimeRef.current;
    lastTimeRef.current = now;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlePool.getActive();
    
    for (const particle of particles) {
      const isAlive = updateParticle(particle, deltaTime);
      
      if (isAlive) {
        drawParticle(ctx, particle);
      }
    }

    cleanupDeadParticles();

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [canvasRef]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, [canvasRef]);

  const throttledMouseMove = useCallback(
    throttle(updateMousePosition, 50), 
    [updateMousePosition]
  );

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();

    window.addEventListener('mousemove', throttledMouseMove);
    window.addEventListener('resize', resizeCanvas);

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      particlePool.clear();
    };
  }, [enabled, canvasRef, throttledMouseMove, resizeCanvas, animate]);

  return {
    mousePosition: mouseRef.current,
    isMoving: isMovingRef.current,
  };
}
