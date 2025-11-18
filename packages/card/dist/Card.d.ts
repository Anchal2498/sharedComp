import { type ReactNode } from 'react';
import { type ButtonProps } from '@sharedcomp/button';
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
export declare function Card({ title, description, children, footer, actionButton, className, }: CardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Card.d.ts.map