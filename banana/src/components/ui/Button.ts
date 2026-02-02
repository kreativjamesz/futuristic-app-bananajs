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
  secondary: 'bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-300',
  outline: 'bg-transparent text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white',
  ghost: 'bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
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
  
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
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
