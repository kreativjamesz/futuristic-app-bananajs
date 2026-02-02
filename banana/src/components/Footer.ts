/**
 * Footer Component
 * Site footer with links and info
 */

export function createFooter(): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'bg-white border-t border-gray-200 py-12';
  
  const container = document.createElement('div');
  container.className = 'max-w-7xl mx-auto px-6 sm:px-8 lg:px-12';
  
  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      <div>
        <div class="flex items-center gap-2 mb-4">
          <span class="text-2xl">🍌</span>
          <span class="text-xl font-bold text-gray-900">BananaJS</span>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">
          not yet open-source visual page builder. Build beautiful websites without writing code.
        </p>
      </div>
      
      <div>
        <h3 class="font-semibold text-gray-900 mb-4">Product</h3>
        <ul class="space-y-2 text-sm text-gray-600">
          <li><a href="#" class="hover:text-gray-900 transition-colors">Features</a></li>
          <li><a href="#" class="hover:text-gray-900 transition-colors">Documentation</a></li>
          <li><a href="#" class="hover:text-gray-900 transition-colors">Examples</a></li>
          <li><a href="#" class="hover:text-gray-900 transition-colors">Changelog</a></li>
        </ul>
      </div>
      
      <div>
        <h3 class="font-semibold text-gray-900 mb-4">Community</h3>
        <ul class="space-y-2 text-sm text-gray-600">
          <li><a href="#" class="hover:text-gray-900 transition-colors">GitHub</a></li>
          <li><a href="#" class="hover:text-gray-900 transition-colors">Discord</a></li>
          <li><a href="#" class="hover:text-gray-900 transition-colors">Twitter</a></li>
          <li><a href="#" class="hover:text-gray-900 transition-colors">Contributing</a></li>
        </ul>
      </div>
      
      <div>
        <h3 class="font-semibold text-gray-900 mb-4">Legal</h3>
        <ul class="space-y-2 text-sm text-gray-600">
          <li><a href="#" class="hover:text-gray-900 transition-colors">License</a></li>
          <li><a href="#" class="hover:text-gray-900 transition-colors">Privacy</a></li>
          <li><a href="#" class="hover:text-gray-900 transition-colors">Terms</a></li>
        </ul>
      </div>
    </div>
    
    <div class="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
      <p class="text-sm text-gray-600">
        © ${new Date().getFullYear()} BananaJS. Open source under MIT License.
      </p>
      <div class="flex items-center gap-4 text-sm text-gray-600">
        <span>Made with</span>
        <span class="text-red-500">❤️</span>
        <span>by the community</span>
      </div>
    </div>
  `;
  
  footer.appendChild(container);
  return footer;
}
