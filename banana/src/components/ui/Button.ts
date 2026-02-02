/**
 * Button Component
 * Reusable button with variants and sizes
 */

export interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: string;
}

const variantStyles = {
  primary: 'bg-gray-900 text-white hover:bg-gray-800',
  secondary: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50',
  outline: 'bg-transparent text-gray-900 border border-gray-300 hover:bg-gray-50',
  ghost: 'bg-transparent text-gray-700 hover:text-gray-900 hover:bg-gray-100',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
};

export function createButton(props: ButtonProps): HTMLButtonElement {
  const {
    label,
    variant = 'primary',
    size = 'md',
    onClick,
    disabled = false,
    type = 'button',
    className = '',
    icon,
  } = props;

  const button = document.createElement('button');
  button.type = type;
  button.disabled = disabled;
  
  const baseStyles = 'font-medium rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  
  button.className = `${baseStyles} ${variantStyle} ${sizeStyle} ${className}`.trim();
  
  if (icon) {
    button.innerHTML = `<span class="mr-2">${icon}</span>${label}`;
  } else {
    button.textContent = label;
  }
  
  if (onClick) {
    button.addEventListener('click', onClick);
  }
  
  return button;
}
