import type { Particle, MousePosition } from '../types/tsushima.types';

export const PARTICLE_CONFIG = {
  MAX_PARTICLES: 100,
  PARTICLE_LIFE: 3000, // ms - Vida mais longa
  MIN_SPEED: 0.5,
  MAX_SPEED: 3,
  GRAVITY: 0.05,
  FRICTION: 0.98,
  MIN_SIZE: 3,
  MAX_SIZE: 8,
  SPAWN_RATE: 5, // 5 flores por spawn (mais frequente = mais suave)
  IDLE_SPAWN_RATE: 0, // SEM flores quando mouse parado
  CONSTANT_SPAWN_INTERVAL: 1000, // Não usado
} as const;

class ParticlePool {
  private pool: Particle[] = [];
  private active: Particle[] = [];

  constructor(size: number) {
    for (let i = 0; i < size; i++) {
      this.pool.push(this.createParticle(0, 0));
    }
  }

  private createParticle(x: number, y: number): Particle {
    return {
      x,
      y,
      vx: 0,
      vy: 0,
      life: PARTICLE_CONFIG.PARTICLE_LIFE,
      maxLife: PARTICLE_CONFIG.PARTICLE_LIFE,
      size: PARTICLE_CONFIG.MIN_SIZE,
      rotation: 0,
      rotationSpeed: 0,
      opacity: 1,
      type: Math.random() > 0.5 ? 'petal' : 'leaf',
    };
  }

  get(x: number, y: number, vx: number, vy: number): Particle | null {
    let particle: Particle;

    if (this.pool.length > 0) {
      particle = this.pool.pop()!;
    } else if (this.active.length < PARTICLE_CONFIG.MAX_PARTICLES) {
      particle = this.createParticle(x, y);
    } else {
      return null;
    }

    particle.x = x;
    particle.y = y;
    particle.vx = vx;
    particle.vy = vy;
    particle.life = PARTICLE_CONFIG.PARTICLE_LIFE;
    particle.maxLife = PARTICLE_CONFIG.PARTICLE_LIFE;
    particle.size = PARTICLE_CONFIG.MIN_SIZE + Math.random() * (PARTICLE_CONFIG.MAX_SIZE - PARTICLE_CONFIG.MIN_SIZE);
    particle.rotation = Math.random() * Math.PI * 2;
    particle.rotationSpeed = (Math.random() - 0.5) * 0.1;
    particle.opacity = 1;
    particle.type = Math.random() > 0.5 ? 'petal' : 'leaf';

    this.active.push(particle);
    return particle;
  }

  release(particle: Particle): void {
    const index = this.active.indexOf(particle);
    if (index > -1) {
      this.active.splice(index, 1);
      this.pool.push(particle);
    }
  }

  getActive(): Particle[] {
    return this.active;
  }

  clear(): void {
    this.pool.push(...this.active);
    this.active = [];
  }
}

export const particlePool = new ParticlePool(PARTICLE_CONFIG.MAX_PARTICLES);

export function calculateMouseSpeed(mouse: MousePosition): number {
  const dx = mouse.x - mouse.prevX;
  const dy = mouse.y - mouse.prevY;
  return Math.sqrt(dx * dx + dy * dy);
}

export function calculateMouseAngle(mouse: MousePosition): number {
  const dx = mouse.x - mouse.prevX;
  const dy = mouse.y - mouse.prevY;
  return Math.atan2(dy, dx);
}

export function spawnParticles(
  mouse: MousePosition,
  speed: number
): void {
  const angle = calculateMouseAngle(mouse);
  
  let particlesToSpawn: number;
  if (speed < 1) {
    particlesToSpawn = PARTICLE_CONFIG.IDLE_SPAWN_RATE;
  } else {
    particlesToSpawn = Math.min(
      PARTICLE_CONFIG.SPAWN_RATE * (speed / 10),
      PARTICLE_CONFIG.SPAWN_RATE * 2
    );
  }

  for (let i = 0; i < particlesToSpawn; i++) {
    const angleVariation = (Math.random() - 0.5) * 0.5;
    const finalAngle = angle + angleVariation;

    const velocityMultiplier = Math.min(speed / 5, 3);
    const vx = Math.cos(finalAngle) * velocityMultiplier * (0.5 + Math.random() * 0.5);
    const vy = Math.sin(finalAngle) * velocityMultiplier * (0.5 + Math.random() * 0.5);

    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;

    particlePool.get(
      mouse.x + offsetX,
      mouse.y + offsetY,
      vx,
      vy
    );
  }
}

export function updateParticle(particle: Particle, deltaTime: number = 16): boolean {
  particle.life -= deltaTime;
  
  if (particle.life <= 0) {
    return false; 
  }

  particle.vy += PARTICLE_CONFIG.GRAVITY;
  particle.vx *= PARTICLE_CONFIG.FRICTION;
  particle.vy *= PARTICLE_CONFIG.FRICTION;

  particle.x += particle.vx;
  particle.y += particle.vy;

  particle.rotation += particle.rotationSpeed;

  particle.opacity = particle.life / particle.maxLife;

  return true;
}

export function drawParticle(
  ctx: CanvasRenderingContext2D,
  particle: Particle
): void {
  ctx.save();
  
  ctx.translate(particle.x, particle.y);
  ctx.rotate(particle.rotation);
  ctx.globalAlpha = particle.opacity;

  if (particle.type === 'petal') {
    const petalSize = particle.size;
    
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      
      ctx.save();
      ctx.rotate(angle);
    
      ctx.beginPath();
      
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, petalSize);
      gradient.addColorStop(0, '#FFB6C1'); 
      gradient.addColorStop(0.5, '#FF69B4'); 
      gradient.addColorStop(1, '#DC143C'); 
      
      ctx.fillStyle = gradient;

      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        -petalSize * 0.5, -petalSize * 0.3,
        -petalSize * 0.5, -petalSize * 0.8,
        0, -petalSize
      );
      ctx.bezierCurveTo(
        petalSize * 0.5, -petalSize * 0.8,
        petalSize * 0.5, -petalSize * 0.3,
        0, 0
      );
      ctx.closePath();
      ctx.fill();
    
      ctx.strokeStyle = 'rgba(220, 20, 60, 0.3)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
      ctx.restore();
    }
  
    const centerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, petalSize * 0.3);
    centerGradient.addColorStop(0, '#FFF8DC');
    centerGradient.addColorStop(0.5, '#FFD700'); 
    centerGradient.addColorStop(1, '#DAA520');
    
    ctx.fillStyle = centerGradient;
    ctx.beginPath();
    ctx.arc(0, 0, petalSize * 0.25, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#B8860B';
    ctx.lineWidth = 0.3;
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(
        Math.cos(angle) * petalSize * 0.15,
        Math.sin(angle) * petalSize * 0.15
      );
      ctx.stroke();
    }
    
  } else {
    const leafSize = particle.size;
    
    const gradient = ctx.createLinearGradient(0, leafSize, 0, -leafSize);
    gradient.addColorStop(0, '#8B7355'); 
    gradient.addColorStop(0.2, '#DAA520'); 
    gradient.addColorStop(0.5, '#FFD700');
    gradient.addColorStop(1, '#F0E68C'); 
    
    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.moveTo(0, leafSize * 0.8); 
    
    ctx.bezierCurveTo(
      -leafSize * 0.3, leafSize * 0.4,
      -leafSize * 0.8, 0,
      -leafSize * 0.6, -leafSize * 0.8
    );
    
    ctx.bezierCurveTo(
      -leafSize * 0.4, -leafSize,
      -leafSize * 0.2, -leafSize * 0.9,
      0, -leafSize * 0.85
    );
    
    ctx.bezierCurveTo(
      leafSize * 0.2, -leafSize * 0.9,
      leafSize * 0.4, -leafSize,
      leafSize * 0.6, -leafSize * 0.8
    );
    
    ctx.bezierCurveTo(
      leafSize * 0.8, 0,
      leafSize * 0.3, leafSize * 0.4,
      0, leafSize * 0.8
    );
    
    ctx.closePath();
    ctx.fill();
    
    ctx.strokeStyle = 'rgba(139, 115, 85, 0.4)';
    ctx.lineWidth = 0.5;
    
    for (let i = -3; i <= 3; i++) {
      const angle = (i * Math.PI) / 12;
      ctx.beginPath();
      ctx.moveTo(0, leafSize * 0.8);
      ctx.lineTo(
        Math.sin(angle) * leafSize * 0.6,
        leafSize * 0.8 - Math.cos(angle) * leafSize * 1.6
      );
      ctx.stroke();
    }
    
    ctx.strokeStyle = 'rgba(139, 115, 85, 0.3)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(0, leafSize * 0.8);
    ctx.bezierCurveTo(
      -leafSize * 0.3, leafSize * 0.4,
      -leafSize * 0.8, 0,
      -leafSize * 0.6, -leafSize * 0.8
    );
    ctx.bezierCurveTo(
      -leafSize * 0.4, -leafSize,
      -leafSize * 0.2, -leafSize * 0.9,
      0, -leafSize * 0.85
    );
    ctx.bezierCurveTo(
      leafSize * 0.2, -leafSize * 0.9,
      leafSize * 0.4, -leafSize,
      leafSize * 0.6, -leafSize * 0.8
    );
    ctx.bezierCurveTo(
      leafSize * 0.8, 0,
      leafSize * 0.3, leafSize * 0.4,
      0, leafSize * 0.8
    );
    ctx.stroke();
  }

  ctx.restore();
}

export function cleanupDeadParticles(): void {
  const active = particlePool.getActive();
  const toRemove: Particle[] = [];

  for (const particle of active) {
    if (particle.life <= 0) {
      toRemove.push(particle);
    }
  }

  for (const particle of toRemove) {
    particlePool.release(particle);
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
