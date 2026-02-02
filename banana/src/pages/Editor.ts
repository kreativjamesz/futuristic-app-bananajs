/**
 * Visual Editor Page
 * Main editing interface for BananaJS
 */

import { createNavbar } from '../components';
import { DragDropEngine } from '../core/drag-drop';
import { ElementTree } from '../core/tree';

export function createEditorPage(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'min-h-screen bg-gray-50 flex flex-col';

  // Navbar
  const navbar = createNavbar();
  container.appendChild(navbar);

  // Main editor layout
  const editorLayout = document.createElement('div');
  editorLayout.className = 'flex-1 flex pt-16';

  // Left Panel - Component Palette
  const palette = createComponentPalette();
  editorLayout.appendChild(palette);

  // Center - Canvas Area
  const canvas = createCanvas();
  editorLayout.appendChild(canvas);

  // Right Panel - Properties
  const properties = createPropertiesPanel();
  editorLayout.appendChild(properties);

  container.appendChild(editorLayout);

  // Initialize editor
  initializeEditor(canvas);

  return container;
}

/**
 * Component Palette - Left Sidebar
 */
function createComponentPalette(): HTMLElement {
  const palette = document.createElement('div');
  palette.className = 'w-64 bg-white border-r border-gray-200 overflow-y-auto';
  palette.setAttribute('data-palette', 'true');

  const header = document.createElement('div');
  header.className = 'p-4 border-b border-gray-200';
  header.innerHTML = `
    <h2 class="text-sm font-semibold text-gray-900 mb-1">Components</h2>
    <p class="text-xs text-gray-500">Drag to canvas</p>
  `;
  palette.appendChild(header);

  const components = [
    { name: 'Container', icon: '📦', type: 'div' },
    { name: 'Text', icon: '📝', type: 'p' },
    { name: 'Heading', icon: '📄', type: 'h1' },
    { name: 'Button', icon: '🔘', type: 'button' },
    { name: 'Image', icon: '🖼️', type: 'img' },
    { name: 'Link', icon: '🔗', type: 'a' },
    { name: 'Input', icon: '📥', type: 'input' },
    { name: 'Section', icon: '📑', type: 'section' },
  ];

  const list = document.createElement('div');
  list.className = 'p-2 space-y-1';

  components.forEach((component) => {
    const item = document.createElement('div');
    item.className = 'p-3 bg-gray-50 rounded-md border border-gray-200 cursor-grab active:cursor-grabbing hover:bg-gray-100 transition-colors select-none';
    item.setAttribute('data-draggable', 'true');
    item.setAttribute('data-component-type', component.type);
    item.setAttribute('draggable', 'false'); // Prevent native HTML5 drag
    item.innerHTML = `
      <div class="flex items-center gap-3 pointer-events-none">
        <span class="text-xl">${component.icon}</span>
        <span class="text-sm font-medium text-gray-900">${component.name}</span>
      </div>
    `;
    
    // Prevent text selection
    item.addEventListener('mousedown', (e) => {
      e.preventDefault();
    });
    
    list.appendChild(item);
  });

  palette.appendChild(list);
  return palette;
}

/**
 * Canvas Area - Center
 */
function createCanvas(): HTMLElement {
  const canvasWrapper = document.createElement('div');
  canvasWrapper.className = 'flex-1 flex flex-col bg-gray-100';

  // Toolbar
  const toolbar = document.createElement('div');
  toolbar.className = 'h-12 bg-white border-b border-gray-200 flex items-center gap-2 px-4';
  toolbar.innerHTML = `
    <button class="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
      Desktop
    </button>
    <button class="px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
      Tablet
    </button>
    <button class="px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
      Mobile
    </button>
    <div class="flex-1"></div>
    <button class="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
      Undo
    </button>
    <button class="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
      Redo
    </button>
    <button class="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
      Export
    </button>
  `;
  canvasWrapper.appendChild(toolbar);

  // Canvas
  const canvas = document.createElement('div');
  canvas.id = 'banana-canvas';
  canvas.className = 'flex-1 overflow-auto p-8 flex items-center justify-center';
  
  const canvasInner = document.createElement('div');
  canvasInner.id = 'banana-canvas-inner';
  canvasInner.className = 'bg-white rounded-md border-2 border-dashed border-gray-300 min-h-[600px] w-full max-w-6xl p-8';
  canvasInner.innerHTML = `
    <div class="text-center text-gray-400 py-20">
      <p class="text-sm">Drop components here to start building</p>
    </div>
  `;

  canvas.appendChild(canvasInner);
  canvasWrapper.appendChild(canvas);

  return canvasWrapper;
}

/**
 * Properties Panel - Right Sidebar
 */
function createPropertiesPanel(): HTMLElement {
  const panel = document.createElement('div');
  panel.className = 'w-80 bg-white border-l border-gray-200 overflow-y-auto';

  const header = document.createElement('div');
  header.className = 'p-4 border-b border-gray-200';
  header.innerHTML = `
    <h2 class="text-sm font-semibold text-gray-900 mb-1">Properties</h2>
    <p class="text-xs text-gray-500">Edit selected element</p>
  `;
  panel.appendChild(header);

  const content = document.createElement('div');
  content.className = 'p-4';
  content.innerHTML = `
    <div class="text-center py-12 text-gray-400">
      <p class="text-sm">Select an element to edit</p>
    </div>
  `;
  panel.appendChild(content);

  return panel;
}

/**
 * Initialize Editor
 */
function initializeEditor(canvas: HTMLElement): void {
  const canvasInner = canvas.querySelector('#banana-canvas-inner') as HTMLElement;
  if (!canvasInner) return;

  // Initialize drag-drop engine on the entire document to catch palette drags
  const dragDrop = new DragDropEngine(document.body);

  // Register canvas as drop zone
  dragDrop.registerDropZone('canvas', canvasInner, []);

  // Handle drops
  canvasInner.addEventListener('banana:drop', ((e: CustomEvent) => {
    const { element } = e.detail;
    const componentType = element.getAttribute('data-component-type');
    
    if (componentType) {
      createElementOnCanvas(canvasInner, componentType);
    }
  }) as EventListener);

  // Initialize element tree
  const tree = new ElementTree();
  
  // Store references for later use
  (canvasInner as any).__bananaEditor = {
    dragDrop,
    tree,
  };
}

/**
 * Create element on canvas
 */
function createElementOnCanvas(canvas: HTMLElement, type: string): void {
  const element = document.createElement(type);
  element.className = 'banana-element p-4 border border-gray-200 rounded-md mb-2 cursor-pointer hover:border-gray-400 transition-colors';
  element.setAttribute('data-banana-id', `element-${Date.now()}`);

  // Set default content based on type
  switch (type) {
    case 'div':
    case 'section':
      element.className += ' min-h-[100px]';
      element.innerHTML = '<p class="text-gray-400 text-sm">Container</p>';
      break;
    case 'p':
      element.textContent = 'Text content';
      break;
    case 'h1':
    case 'h2':
    case 'h3':
      element.textContent = 'Heading';
      element.className = element.className.replace('p-4', 'p-2');
      break;
    case 'button':
      element.textContent = 'Button';
      element.className = 'px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800';
      break;
    case 'img':
      (element as HTMLImageElement).src = 'https://via.placeholder.com/300x200';
      (element as HTMLImageElement).alt = 'Image';
      break;
    case 'a':
      (element as HTMLAnchorElement).href = '#';
      element.textContent = 'Link';
      break;
    case 'input':
      (element as HTMLInputElement).type = 'text';
      (element as HTMLInputElement).placeholder = 'Input field';
      (element as HTMLInputElement).className = 'px-3 py-2 border border-gray-300 rounded-md';
      break;
  }

  // Remove placeholder if exists
  const placeholder = canvas.querySelector('.text-center.text-gray-400');
  if (placeholder) {
    placeholder.remove();
  }

  canvas.appendChild(element);
}
