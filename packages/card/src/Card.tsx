import { type ReactNode } from 'react';
import { Button, type ButtonProps } from '@sharedcomp/button';
import './Card.css';

export interface CardProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  actionButton?: {
    label: string;
    onClick: () => void;
    variant?: ButtonProps['variant'];
  };
  className?: string;
}

export function Card({
  title,
  description,
  children,
  footer,
  actionButton,
  className = '',
}: CardProps) {
  return (
    <div className={`card ${className}`.trim()}>
      {title && (
        <div className="card__header">
          <h3 className="card__title">{title}</h3>
        </div>
      )}
      
      {description && <p className="card__description">{description}</p>}
      
      {children && <div className="card__content">{children}</div>}
      
      {(footer || actionButton) && (
        <div className="card__footer">
          {footer}
          {actionButton && (
            <Button
              variant={actionButton.variant || 'primary'}
              onClick={actionButton.onClick}
            >
              {actionButton.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}