/**
 * Call-to-Action Section Component
 * Final CTA to get users started
 */

import { createButton } from './ui';

export function createCTA(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'py-24 bg-gray-900';
  
  const container = document.createElement('div');
  container.className = 'max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center';
  
  container.innerHTML = `
    <div class="text-6xl mb-6">🍌</div>
    <h2 class="text-4xl sm:text-5xl font-bold text-white mb-6">
      Ready to Build Something Amazing?
    </h2>
    <p class="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
      Join thousands of developers and designers creating beautiful websites with BananaJS. Get started in minutes, not hours.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center" id="cta-buttons"></div>
    <p class="text-gray-400 text-sm mt-8">
      Free forever • Open source • No credit card required
    </p>
  `;
  
  section.appendChild(container);
  
  // Add buttons
  const buttonContainer = container.querySelector('#cta-buttons')!;
  const primaryButton = createButton({
    label: 'Start Building Now',
    variant: 'primary',
    size: 'lg',
    className: 'bg-white text-gray-900 hover:bg-gray-100',
    onClick: () => console.log('Start Building clicked'),
  });
  const outlineButton = createButton({
    label: 'View on GitHub',
    variant: 'outline',
    size: 'lg',
    className: 'bg-transparent text-white border-white hover:bg-white hover:text-gray-900',
    onClick: () => console.log('View GitHub clicked'),
  });
  buttonContainer.appendChild(primaryButton);
  buttonContainer.appendChild(outlineButton);
  
  return section;
}
