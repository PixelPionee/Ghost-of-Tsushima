import { useState } from 'react';
import './InkButton.css';

interface InkButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

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
