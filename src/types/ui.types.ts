// UI component prop types
export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hoverable?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showCloseButton?: boolean;
}

export interface BadgeProps {
    variant?: 'success' | 'warning' | 'info' | 'default';
    children: React.ReactNode;
    size?: 'sm' | 'md';
}

export interface ProgressBarProps {
    value: number;
    max?: number;
    color?: string;
    label?: string;
    showPercentage?: boolean;
    animated?: boolean;
}

export interface IconButtonProps {
    icon: React.ElementType;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    'aria-label': string;
}
