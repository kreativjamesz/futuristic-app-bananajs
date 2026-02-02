import './style.css';
// import { BananaJS } from './index';

// Initialize BananaJS
const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">🍌 BananaJS</h1>
      <p class="text-gray-600 mb-8">Visual Page Builder - Coming Soon</p>
      
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">Canvas Area</h2>
        <div id="banana-canvas" class="min-h-[400px] border-2 border-dashed border-gray-300 rounded-lg p-4">
          <p class="text-gray-500 text-center">Drop elements here</p>
        </div>
      </div>
    </div>
  </div>
`;

// Initialize BananaJS instance
// const banana = new BananaJS({
//   container: '#banana-canvas',
// });
