/**
 * Textarea Component
 * Reusable textarea field with variants
 */

export interface TextareaProps {
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  rows?: number;
  className?: string;
  onChange?: (e: Event) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
}

export function createTextarea(props: TextareaProps): HTMLElement {
  const {
    value = '',
    placeholder = '',
    label,
    required = false,
    disabled = false,
    error,
    rows = 3,
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

  const textarea = document.createElement('textarea');
  textarea.rows = rows;
  textarea.value = value;
  textarea.placeholder = placeholder;
  textarea.required = required;
  textarea.disabled = disabled;
  
  const baseStyles = 'w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors duration-150 resize-y';
  const normalStyles = 'border-gray-300 focus:border-gray-900 focus:ring-gray-900';
  const errorStyles = 'border-red-500 focus:border-red-500 focus:ring-red-500';
  
  textarea.className = `${baseStyles} ${error ? errorStyles : normalStyles} ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`.trim();
  
  if (onChange) {
    textarea.addEventListener('input', onChange);
  }
  if (onFocus) {
    textarea.addEventListener('focus', onFocus);
  }
  if (onBlur) {
    textarea.addEventListener('blur', onBlur);
  }

  container.appendChild(textarea);

  if (error) {
    const errorEl = document.createElement('p');
    errorEl.className = 'mt-2 text-sm text-red-600';
    errorEl.textContent = error;
    container.appendChild(errorEl);
  }

  return container;
}
