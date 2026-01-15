import { useState } from 'react';
import './InkButton.css';

interface InkButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

/**
 * Botão com efeito de pincelada de tinta japonesa (Sumi-e)
 * Inspirado no menu de Ghost of Tsushima
 */
export function InkButton({ 
  children, 
  onClick,
  variant = 'primary',
  size = 'medium'
}: InkButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`ink-button ink-button--${variant} ink-button--${size} ${isHovered ? 'ink-button--hovered' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fundo de tinta (aparece no hover) */}
      <span className="ink-button__background" aria-hidden="true" />
      
      {/* Texto do botão */}
      <span className="ink-button__text">
        {children}
      </span>
      
      {/* Seta (opcional) */}
      <span className="ink-button__arrow" aria-hidden="true">→</span>
    </button>
  );
}
