/**
 * Visual Editor Page
 * Main editing interface for BananaJS
 */

import { createNavbar } from '../components';
import { createPropertiesPanel, updatePropertiesPanel } from '../components/PropertiesPanel';
import { DragDropEngine } from '../core/drag-drop';
import { ElementTree } from '../core/tree';
import type { ElementNode } from '../core/types';

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
  const canvasInner = canvas.querySelector('#banana-canvas-inner') as HTMLElement;
  const properties = createPropertiesPanel((elementId: string, updates: Record<string, any>) => {
    // Handle property updates
    console.log('Property updated:', elementId, updates);
    const editor = (canvasInner as any)?.__bananaEditor;
    if (editor?.tree) {
      const node = editor.tree.getNode(elementId);
      if (node) {
        Object.assign(node.props, updates);
      }
    }
  });
  editorLayout.appendChild(properties);

  container.appendChild(editorLayout);

  // Initialize editor
  initializeEditor(canvas, properties);

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
  canvasInner.setAttribute('data-banana-canvas', 'true');
  canvasInner.innerHTML = `
    <div class="text-center text-gray-400 py-20" data-placeholder="true">
      <p class="text-sm">Drop components here to start building</p>
    </div>
  `;

  canvas.appendChild(canvasInner);
  canvasWrapper.appendChild(canvas);

  return canvasWrapper;
}


/**
 * Initialize Editor
 */
function initializeEditor(canvas: HTMLElement, propertiesPanel: HTMLElement): void {
  const canvasInner = canvas.querySelector('#banana-canvas-inner') as HTMLElement;
  if (!canvasInner) return;

  // Initialize drag-drop engine on the entire document to catch palette drags
  const dragDrop = new DragDropEngine(document.body);

  // Register canvas as drop zone (root container)
  canvasInner.setAttribute('data-banana-id', 'canvas');
  dragDrop.registerDropZone('canvas', canvasInner, []);

  // Handle drops
  document.body.addEventListener('banana:drop', ((e: CustomEvent) => {
    const { element, dropZone } = e.detail;
    const componentType = element.getAttribute('data-component-type');
    
    console.log('Drop detected:', { componentType, dropZone: dropZone?.id });
    
    if (componentType && dropZone) {
      // Determine drop target
      let dropTarget: HTMLElement;
      
      if (dropZone.id === 'canvas') {
        // Dropping on canvas
        dropTarget = canvasInner;
        canvasInner.setAttribute('data-banana-canvas', 'true');
      } else {
        // Dropping on an element (nested)
        dropTarget = dropZone.element;
      }
      
      // Get editor instance
      const editor = (canvasInner as any).__bananaEditor;
      if (editor) {
        createElementOnCanvas(dropTarget, componentType, editor.dragDrop, editor.tree);
      } else {
        createElementOnCanvas(dropTarget, componentType, dragDrop, tree);
      }
    }
  }) as EventListener);

  // Initialize element tree
  const tree = new ElementTree();
  
  // Store references for later use
  (canvasInner as any).__bananaEditor = {
    dragDrop,
    tree,
    propertiesPanel,
  };

  // Setup element selection
  setupElementSelection(canvasInner, tree, propertiesPanel);
}

/**
 * Setup element selection on canvas
 */
function setupElementSelection(
  canvas: HTMLElement,
  tree: ElementTree,
  propertiesPanel: HTMLElement | null
): void {
  canvas.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    
    // Find the banana element (might be clicking on child)
    const element = target.closest('.banana-element') as HTMLElement;
    if (!element) {
      // Deselect
      if (propertiesPanel) {
        updatePropertiesPanel(null, null);
      }
      return;
    }

    const elementId = element.getAttribute('data-banana-id');
    if (!elementId) return;

    // Get node from tree
    const node = tree.getNode(elementId);
    if (!node) return;

    // Update properties panel
    if (propertiesPanel) {
      updatePropertiesPanel(element, node);
    }

    // Visual selection feedback
    document.querySelectorAll('.banana-element-selected').forEach((el) => {
      el.classList.remove('banana-element-selected');
    });
    element.classList.add('banana-element-selected');
  });

  // Keyboard shortcuts for deletion
  document.addEventListener('keydown', (e) => {
    // Only delete if an element is selected and not typing in an input/textarea
    const activeElement = document.activeElement;
    if (
      activeElement &&
      (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')
    ) {
      return; // Don't delete while typing
    }

    if (e.key === 'Delete' || e.key === 'Backspace') {
      const selectedElement = document.querySelector('.banana-element-selected') as HTMLElement;
      if (!selectedElement) return;

      const elementId = selectedElement.getAttribute('data-banana-id');
      if (!elementId) return;

      const node = tree.getNode(elementId);
      if (!node) return;

      e.preventDefault();

      if (confirm('Are you sure you want to delete this element?')) {
        deleteSelectedElement(selectedElement, node, tree);
      }
    }
  });
}

/**
 * Delete selected element
 */
function deleteSelectedElement(
  element: HTMLElement,
  node: ElementNode,
  tree: ElementTree
): void {
  const canvas = document.querySelector('#banana-canvas-inner') as HTMLElement;
  if (!canvas) return;

  const editor = (canvas as any)?.__bananaEditor;
  if (!editor) return;

  // Remove from element tree
  tree.removeNode(node.id);

  // Unregister as drop zone if it's a container
  if (element.hasAttribute('data-banana-container') && editor.dragDrop) {
    editor.dragDrop.unregisterDropZone(node.id);
  }

  // Remove from DOM
  element.remove();

  // Clear selection
  const propertiesPanel = document.querySelector('#banana-properties-panel');
  if (propertiesPanel) {
    updatePropertiesPanel(null, null);
  }

  // Show placeholder if canvas is empty
  const remainingElements = canvas.querySelectorAll('.banana-element');
  if (remainingElements.length === 0) {
    const placeholder = document.createElement('div');
    placeholder.className = 'text-center text-gray-400 py-20';
    placeholder.setAttribute('data-placeholder', 'true');
    placeholder.innerHTML = '<p class="text-sm">Drop components here to start building</p>';
    canvas.appendChild(placeholder);
  }
}

/**
 * Create element on canvas
 */
function createElementOnCanvas(
  parent: HTMLElement, 
  type: string, 
  dragDrop?: DragDropEngine,
  tree?: ElementTree
): HTMLElement {
  const elementId = `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const element = document.createElement(type);
  element.setAttribute('data-banana-id', elementId);
  element.setAttribute('data-banana-type', type);

  // Determine if element can contain children
  const canContainChildren = ['div', 'section', 'article', 'main', 'header', 'footer', 'nav', 'aside'].includes(type);
  
  if (canContainChildren) {
    element.className = 'banana-element banana-container p-4 border-2 border-dashed border-gray-300 rounded-md mb-2 min-h-[80px] bg-gray-50';
    element.setAttribute('data-banana-container', 'true');
    
    // Add placeholder for empty containers
    const placeholder = document.createElement('div');
    placeholder.className = 'text-center text-gray-400 text-xs py-4';
    placeholder.textContent = 'Drop elements here';
    placeholder.setAttribute('data-placeholder', 'true');
    element.appendChild(placeholder);
  } else {
    // Non-container elements
    switch (type) {
      case 'p':
        element.className = 'banana-element p-2 text-gray-900 mb-2';
        element.textContent = 'Text content';
        break;
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        element.className = `banana-element ${type} font-bold text-gray-900 mb-2`;
        element.textContent = 'Heading';
        break;
      case 'button':
        element.className = 'banana-element px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 mb-2 inline-block';
        element.textContent = 'Button';
        break;
      case 'img':
        (element as HTMLImageElement).src = 'https://via.placeholder.com/300x200';
        (element as HTMLImageElement).alt = 'Image';
        element.className = 'banana-element mb-2 max-w-full';
        break;
      case 'a':
        (element as HTMLAnchorElement).href = '#';
        element.textContent = 'Link';
        element.className = 'banana-element text-blue-600 hover:underline mb-2 inline-block';
        break;
      case 'input':
        (element as HTMLInputElement).type = 'text';
        (element as HTMLInputElement).placeholder = 'Input field';
        element.className = 'banana-element px-3 py-2 border border-gray-300 rounded-md mb-2 block';
        break;
      default:
        element.className = 'banana-element p-2 border border-gray-200 rounded-md mb-2';
        element.textContent = type;
    }
  }

  // Add to DOM
  const placeholder = parent.querySelector('[data-placeholder]');
  if (placeholder && parent.hasAttribute('data-banana-canvas')) {
    // If dropping on canvas, remove canvas placeholder
    placeholder.remove();
  } else if (placeholder && placeholder.parentElement === parent) {
    // If dropping in container, remove container placeholder
    placeholder.remove();
  }

  parent.appendChild(element);

  // Register as drop zone if it's a container
  if (canContainChildren && dragDrop) {
    dragDrop.registerDropZone(elementId, element, []);
  }

  // Add to element tree
  if (tree) {
    const parentId = parent.getAttribute('data-banana-id');
    const node: ElementNode = {
      id: elementId,
      type,
      props: {},
      children: [],
      parent: parentId === 'canvas' ? undefined : (parentId || undefined),
      styles: {},
    };
    tree.addNode(node, parentId === 'canvas' ? undefined : (parentId || undefined));
  }

  return element;
}
