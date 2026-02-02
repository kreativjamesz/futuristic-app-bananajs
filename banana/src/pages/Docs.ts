/**
 * Documentation Page
 */

import { createNavbar, createFooter } from '../components';
import { createButton } from '../components/ui';
import { getRouter } from '../utils/router';

export function createDocsPage(): HTMLElement {
  const container = document.createElement('div');
  const navbar = createNavbar();
  const footer = createFooter();

  const main = document.createElement('main');
  main.className = 'min-h-screen pt-16 bg-gray-50';

  const content = document.createElement('div');
  content.className = 'max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12';

  content.innerHTML = `
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
      <p class="text-lg text-gray-600">
        Learn how to use BananaJS to build beautiful websites.
      </p>
    </div>

    <div class="bg-white rounded-md border border-gray-200 p-6 mb-6">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">Getting Started</h2>
      <p class="text-gray-600 mb-4">
        BananaJS is a powerful visual page builder that lets you create websites without writing code.
      </p>
      <div class="space-y-2">
        <h3 class="text-lg font-medium text-gray-900">Installation</h3>
        <pre class="bg-gray-50 p-4 rounded-md text-sm overflow-x-auto"><code>npm install bananajs</code></pre>
      </div>
    </div>

    <div class="bg-white rounded-md border border-gray-200 p-6">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">Quick Start</h2>
      <p class="text-gray-600 mb-4">
        Get started with BananaJS in minutes.
      </p>
      <div class="space-y-2">
        <h3 class="text-lg font-medium text-gray-900">Basic Usage</h3>
        <pre class="bg-gray-50 p-4 rounded-md text-sm overflow-x-auto"><code>import { BananaJS } from 'bananajs';

const banana = new BananaJS({
  container: '#my-canvas',
});

banana.init();</code></pre>
      </div>
    </div>
  `;

  const backButton = createButton({
    label: '← Back to Home',
    variant: 'ghost',
    size: 'md',
    onClick: () => {
      getRouter().navigate('/');
    },
  });
  backButton.className += ' mb-6';

  content.insertBefore(backButton, content.firstChild);
  main.appendChild(content);
  
  container.appendChild(navbar);
  container.appendChild(main);
  container.appendChild(footer);

  return container;
}
