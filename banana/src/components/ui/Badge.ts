/**
 * Badge Component
 * Reusable badge/pill component
 */

export interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles = {
  default: 'bg-gray-100 text-gray-800 border-gray-200',
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  error: 'bg-red-100 text-red-800 border-red-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1 text-sm',
};

export function createBadge(props: BadgeProps): HTMLElement {
  const {
    label,
    variant = 'default',
    size = 'md',
    className = '',
  } = props;

  const badge = document.createElement('span');
  const baseStyles = 'inline-flex items-center font-medium rounded-md border';
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  
  badge.className = `${baseStyles} ${variantStyle} ${sizeStyle} ${className}`.trim();
  badge.textContent = label;

  return badge;
}
