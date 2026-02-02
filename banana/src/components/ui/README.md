# UI Components

Reusable UI components for BananaJS. All components are vanilla TypeScript functions that return DOM elements.

## Usage

```typescript
import { createButton, createInput, createCard, createBadge, createCheckbox } from './components/ui';

// Button
const button = createButton({
  label: 'Click Me',
  variant: 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost'
  size: 'md', // 'sm' | 'md' | 'lg'
  onClick: (e) => console.log('Clicked!'),
});

// Input
const input = createInput({
  type: 'text',
  label: 'Email',
  placeholder: 'Enter your email',
  required: true,
  onChange: (e) => console.log('Changed'),
});

// Card
const card = createCard({
  title: 'Card Title',
  children: document.createElement('div'),
  hover: true,
  padding: 'md',
});

// Badge
const badge = createBadge({
  label: 'New',
  variant: 'success',
  size: 'md',
});

// Checkbox
const checkbox = createCheckbox({
  label: 'I agree to terms',
  checked: false,
  onChange: (checked) => console.log('Checked:', checked),
});
```

## Components

### Button
- **Variants**: primary, secondary, outline, ghost
- **Sizes**: sm, md, lg
- **Features**: onClick handler, disabled state, icons

### Input
- **Types**: text, email, password, number, tel, url
- **Features**: label, error messages, validation, onChange handlers

### Card
- **Features**: title, hover effects, customizable padding
- **Padding**: none, sm, md, lg

### Badge
- **Variants**: default, success, warning, error, info
- **Sizes**: sm, md, lg

### Checkbox
- **Features**: label, checked state, onChange handler
