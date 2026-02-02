/**
 * Why Section Component
 * Explain why BananaJS exists and its mission
 */

export function createWhy(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'py-24 bg-gradient-to-b from-white to-gray-50';
  
  const container = document.createElement('div');
  container.className = 'max-w-7xl mx-auto px-6 sm:px-8 lg:px-12';
  
  container.innerHTML = `
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 border border-yellow-200 rounded-full text-sm font-medium text-yellow-800 mb-6">
          <span>Why BananaJS?</span>
        </div>
        <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Building Should Be
          <span class="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            Simple & Accessible
          </span>
        </h2>
        <p class="text-lg text-gray-600 mb-6 leading-relaxed">
          We believe that creating beautiful websites shouldn't require learning complex frameworks or writing thousands of lines of code. BananaJS brings the power of professional page builders to everyone.
        </p>
        <p class="text-lg text-gray-600 mb-8 leading-relaxed">
          As an open-source project, we're committed to transparency, community-driven development, and giving you full control over your creations. No hidden costs, no vendor lock-in, just pure creative freedom.
        </p>
        <div class="space-y-4">
          <div class="flex items-start gap-4">
            <div class="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span class="text-white text-sm">✓</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 mb-1">100% Free & Open Source</h3>
              <p class="text-gray-600">No subscriptions, no hidden fees. Forever free.</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span class="text-white text-sm">✓</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 mb-1">Own Your Code</h3>
              <p class="text-gray-600">Export clean, standard HTML/CSS/JS. No proprietary formats.</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span class="text-white text-sm">✓</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 mb-1">Community Driven</h3>
              <p class="text-gray-600">Built by developers, for developers. Your voice matters.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="relative">
        <div class="absolute inset-0 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl transform rotate-3"></div>
        <div class="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white text-xl font-bold">
                B
              </div>
              <div>
                <div class="font-semibold text-gray-900">BananaJS</div>
                <div class="text-sm text-gray-500">Visual Page Builder</div>
              </div>
            </div>
            <div class="h-px bg-gray-200"></div>
            <div class="space-y-3">
              <div class="text-sm font-medium text-gray-500 uppercase tracking-wide">Mission</div>
              <p class="text-gray-700 leading-relaxed">
                To democratize web design by making professional-grade page building tools accessible to everyone, regardless of coding experience.
              </p>
            </div>
            <div class="space-y-3">
              <div class="text-sm font-medium text-gray-500 uppercase tracking-wide">Vision</div>
              <p class="text-gray-700 leading-relaxed">
                A world where anyone can create beautiful, functional websites without barriers. Where creativity isn't limited by technical knowledge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  section.appendChild(container);
  return section;
}
