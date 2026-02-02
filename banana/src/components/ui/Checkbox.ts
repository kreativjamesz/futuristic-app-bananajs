/**
 * Checkbox Component
 * Reusable checkbox with label
 */

export interface CheckboxProps {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function createCheckbox(props: CheckboxProps): HTMLElement {
  const {
    label,
    checked = false,
    disabled = false,
    required = false,
    onChange,
    className = '',
  } = props;

  const container = document.createElement('div');
  container.className = `flex items-center gap-3 ${className}`.trim();

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = checked;
  checkbox.disabled = disabled;
  checkbox.required = required;
  checkbox.className = 'w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-2 focus:ring-gray-900 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50';
  
  if (onChange) {
    checkbox.addEventListener('change', (e) => {
      onChange((e.target as HTMLInputElement).checked);
    });
  }

  const labelEl = document.createElement('label');
  labelEl.className = 'text-sm font-medium text-gray-700 cursor-pointer select-none';
  labelEl.textContent = label;
  labelEl.htmlFor = checkbox.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
  if (!checkbox.id) {
    checkbox.id = labelEl.htmlFor;
  }

  container.appendChild(checkbox);
  container.appendChild(labelEl);

  return container;
}
