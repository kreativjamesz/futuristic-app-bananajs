/**
 * Hero Section Component
 * Main landing section with headline and CTA
 */

import { createButton, createBadge } from './ui';

export function createHero(): HTMLElement {
  const hero = document.createElement('section');
  hero.className = 'relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden';
  
  hero.innerHTML = `
    <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 text-center">
      <div id="hero-badge" class="mb-8"></div>
      
      <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
        Build Beautiful Websites
        <span class="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          Without Writing Code
        </span>
      </h1>
      
      <p class="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
        BananaJS is a powerful, not yet open-source visual page builder that lets you create stunning websites with drag-and-drop simplicity. No coding required.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16" id="hero-cta-buttons">
        <!-- Buttons will be inserted here -->
      </div>
      
      <div class="relative max-w-4xl mx-auto">
        <div class="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent rounded-2xl"></div>
        <div class="relative bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
          <div class="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
            <div class="w-3 h-3 rounded-full bg-red-400"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div class="w-3 h-3 rounded-full bg-green-400"></div>
            <div class="ml-4 text-sm text-gray-600 font-mono">bananajs.dev</div>
          </div>
          <div class="p-8 bg-gradient-to-br from-gray-50 to-white min-h-[400px] flex items-center justify-center">
            <div class="text-center">
              <div class="text-6xl mb-4">🎨</div>
              <p class="text-gray-500 text-lg">Visual Editor Preview</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add badge
  const badgeContainer = hero.querySelector('#hero-badge')!;
  const badge = createBadge({
    label: 'Not Yet Open Source (but soon!) Visual Page Builder',
    variant: 'warning',
    size: 'md',
    className: 'inline-flex items-center gap-2',
  });
  badge.innerHTML = '<span class="text-lg">🍌</span>' + badge.textContent;
  badgeContainer.appendChild(badge);
  
  // Add buttons
  const buttonContainer = hero.querySelector('#hero-cta-buttons')!;
  const primaryButton = createButton({
    label: 'Get Started Free',
    variant: 'primary',
    size: 'lg',
    onClick: () => console.log('Get Started clicked'),
  });
  const secondaryButton = createButton({
    label: 'View Documentation',
    variant: 'secondary',
    size: 'lg',
    onClick: () => console.log('View Docs clicked'),
  });
  buttonContainer.appendChild(primaryButton);
  buttonContainer.appendChild(secondaryButton);
  
  return hero;
}
