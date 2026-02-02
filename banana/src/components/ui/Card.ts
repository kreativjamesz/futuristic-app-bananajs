/**
 * Card Component
 * Reusable card container
 */

export interface CardProps {
  children?: HTMLElement | HTMLElement[] | string;
  title?: string;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function createCard(props: CardProps): HTMLElement {
  const {
    children,
    title,
    className = '',
    hover = false,
    padding = 'md',
  } = props;

  const card = document.createElement('div');
  const baseStyles = 'bg-white rounded-xl border border-gray-200';
  const hoverStyles = hover ? 'hover:border-gray-300 hover:shadow-lg transition-all duration-200' : '';
  card.className = `${baseStyles} ${hoverStyles} ${className}`.trim();

  if (title) {
    const titleEl = document.createElement('h3');
    titleEl.className = 'text-xl font-semibold text-gray-900 mb-4';
    titleEl.textContent = title;
    card.appendChild(titleEl);
  }

  const content = document.createElement('div');
  content.className = paddingStyles[padding];

  if (typeof children === 'string') {
    content.textContent = children;
  } else if (Array.isArray(children)) {
    children.forEach((child) => content.appendChild(child));
  } else if (children) {
    content.appendChild(children);
  }

  card.appendChild(content);
  return card;
}
