/**
 * Navigation Bar Component
 * Top navigation with logo and links
 */

import { getRouter } from '../utils/router';

export function createNavbar(): HTMLElement {
  const nav = document.createElement('nav');
  nav.className = 'fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200';
  
  const container = document.createElement('div');
  container.className = 'max-w-7xl mx-auto px-6 sm:px-8 lg:px-12';
  
  const inner = document.createElement('div');
  inner.className = 'flex items-center justify-between h-16';
  
  inner.innerHTML = `
    <button data-route="/" class="flex items-center gap-3 bg-transparent border-0 cursor-pointer hover:opacity-80 transition-opacity">
      <span class="text-2xl">🍌</span>
      <span class="text-xl font-bold text-gray-900">BananaJS</span>
    </button>
    
    <div class="hidden md:flex items-center gap-8">
      <a href="#features" class="text-gray-600 hover:text-gray-900 transition-colors font-medium">Features</a>
      <a href="#why" class="text-gray-600 hover:text-gray-900 transition-colors font-medium">Why</a>
      <button data-route="/docs" class="text-gray-600 hover:text-gray-900 transition-colors font-medium bg-transparent border-0 cursor-pointer">Docs</button>
      <a href="#github" class="text-gray-600 hover:text-gray-900 transition-colors font-medium">GitHub</a>
    </div>
    
    <div class="flex items-center gap-4">
      <button class="hidden sm:block px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors font-medium bg-transparent border-0 cursor-pointer">
        Sign In
      </button>
      <button class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-medium">
        Get Started
      </button>
    </div>
  `;
  
  container.appendChild(inner);
  nav.appendChild(container);

  // Add click handlers for route navigation
  const routeButtons = nav.querySelectorAll('[data-route]');
  routeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const route = btn.getAttribute('data-route');
      if (route) {
        getRouter().navigate(route);
      }
    });
  });

  return nav;
}
