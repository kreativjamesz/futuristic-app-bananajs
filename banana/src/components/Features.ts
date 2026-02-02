/**
 * Features Section Component
 * Showcase key features of BananaJS
 */

import { createCard } from './ui';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: '🎯',
    title: 'Drag & Drop',
    description: 'Intuitive visual editor with powerful drag-and-drop functionality. Build complex layouts effortlessly.',
  },
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Built with performance in mind. Real-time preview with zero lag, even with complex designs.',
  },
  {
    icon: '📱',
    title: 'Fully Responsive',
    description: 'Design for all devices. Preview and adjust your layouts for mobile, tablet, and desktop instantly.',
  },
  {
    icon: '🎨',
    title: 'Beautiful Components',
    description: 'Pre-built component library with modern, customizable elements ready to use in your projects.',
  },
  {
    icon: '💾',
    title: 'Code Export',
    description: 'Export clean, production-ready HTML, CSS, and JavaScript. No vendor lock-in, full control.',
  },
  {
    icon: '🔓',
    title: 'Open Source',
    description: '100% open source and free forever. Built by the community, for the community.',
  },
];

export function createFeatures(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'py-24 bg-white';
  
  const container = document.createElement('div');
  container.className = 'max-w-7xl mx-auto px-6 sm:px-8 lg:px-12';
  
  const header = document.createElement('div');
  header.className = 'text-center mb-16';
  header.innerHTML = `
    <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
      Everything You Need to Build
    </h2>
    <p class="text-xl text-gray-600 max-w-2xl mx-auto">
      Powerful features that make web design simple, fast, and enjoyable.
    </p>
  `;
  
  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
  
  features.forEach((feature) => {
    const cardContent = document.createElement('div');
    cardContent.innerHTML = `
      <div class="text-4xl mb-4">${feature.icon}</div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">${feature.title}</h3>
      <p class="text-gray-600 leading-relaxed">${feature.description}</p>
    `;
    
    const card = createCard({
      children: cardContent,
      hover: true,
      padding: 'lg',
      className: 'bg-gray-50',
    });
    grid.appendChild(card);
  });
  
  container.appendChild(header);
  container.appendChild(grid);
  section.appendChild(container);
  
  return section;
}
