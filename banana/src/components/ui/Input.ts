/**
 * Input Component
 * Reusable input field with variants
 */

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  onChange?: (e: Event) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
}

export function createInput(props: InputProps): HTMLElement {
  const {
    type = 'text',
    placeholder = '',
    value = '',
    label,
    required = false,
    disabled = false,
    error,
    className = '',
    onChange,
    onFocus,
    onBlur,
  } = props;

  const container = document.createElement('div');
  container.className = `w-full ${className}`;

  if (label) {
    const labelEl = document.createElement('label');
    labelEl.className = 'block text-sm font-medium text-gray-700 mb-2';
    labelEl.textContent = label;
    if (required) {
      labelEl.innerHTML += '<span class="text-red-500 ml-1">*</span>';
    }
    container.appendChild(labelEl);
  }

  const input = document.createElement('input');
  input.type = type;
  input.placeholder = placeholder;
  input.value = value;
  input.required = required;
  input.disabled = disabled;
  
  const baseStyles = 'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200';
  const normalStyles = 'border-gray-300 focus:border-gray-900 focus:ring-gray-900';
  const errorStyles = 'border-red-500 focus:border-red-500 focus:ring-red-500';
  
  input.className = `${baseStyles} ${error ? errorStyles : normalStyles} ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`.trim();
  
  if (onChange) {
    input.addEventListener('input', onChange);
  }
  if (onFocus) {
    input.addEventListener('focus', onFocus);
  }
  if (onBlur) {
    input.addEventListener('blur', onBlur);
  }

  container.appendChild(input);

  if (error) {
    const errorEl = document.createElement('p');
    errorEl.className = 'mt-2 text-sm text-red-600';
    errorEl.textContent = error;
    container.appendChild(errorEl);
  }

  return container;
}
