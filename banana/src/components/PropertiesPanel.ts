/**
 * Properties Panel Component
 * Edit properties of selected elements
 */

import { createInput, createTextarea } from './ui';
import type { ElementNode } from '../core/types';
import { extractPaddingFromClass, removePaddingClasses, pixelsToTailwindClass } from '../utils/tailwind';

export interface PropertiesPanelState {
  selectedElement: HTMLElement | null;
  selectedNode: ElementNode | null;
}

let currentState: PropertiesPanelState = {
  selectedElement: null,
  selectedNode: null,
};

/**
 * Delete element from canvas
 */
function deleteElement(element: HTMLElement, node: ElementNode): void {
  // Get editor instance
  const canvas = document.querySelector('#banana-canvas-inner') as HTMLElement;
  if (!canvas) return;

  const editor = (canvas as any)?.__bananaEditor;
  if (!editor) return;

  // Remove from element tree
  if (editor.tree) {
    editor.tree.removeNode(node.id);
  }

  // Unregister as drop zone if it's a container
  if (element.hasAttribute('data-banana-container') && editor.dragDrop) {
    editor.dragDrop.unregisterDropZone(node.id);
  }

  // Remove from DOM
  element.remove();

  // Clear selection
  updatePropertiesPanel(null, null);

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

export function createPropertiesPanel(
  onUpdate?: (elementId: string, updates: Record<string, any>) => void
): HTMLElement {
  const panel = document.createElement('div');
  panel.className = 'w-80 bg-white border-l border-gray-200 overflow-y-auto';
  panel.id = 'banana-properties-panel';

  const header = document.createElement('div');
  header.className = 'p-4 border-b border-gray-200';
  header.innerHTML = `
    <h2 class="text-sm font-semibold text-gray-900 mb-1">Properties</h2>
    <p class="text-xs text-gray-500">Edit selected element</p>
  `;
  panel.appendChild(header);

  const content = document.createElement('div');
  content.id = 'banana-properties-content';
  content.className = 'p-4';
  content.innerHTML = `
    <div class="text-center py-12 text-gray-400">
      <p class="text-sm">Select an element to edit</p>
    </div>
  `;
  panel.appendChild(content);

  // Store update callback
  (panel as any).__onUpdate = onUpdate;

  return panel;
}

/**
 * Update properties panel with selected element
 */
export function updatePropertiesPanel(
  element: HTMLElement | null,
  node: ElementNode | null
): void {
  currentState.selectedElement = element;
  currentState.selectedNode = node;

  const panel = document.querySelector('#banana-properties-panel');
  if (!panel) return;

  const content = panel.querySelector('#banana-properties-content');
  if (!content) return;

  if (!element || !node) {
    content.innerHTML = `
      <div class="text-center py-12 text-gray-400">
        <p class="text-sm">Select an element to edit</p>
      </div>
    `;
    return;
  }

  // Clear content
  content.innerHTML = '';

  // Element type display with delete button
  const typeDisplay = document.createElement('div');
  typeDisplay.className = 'mb-4 pb-4 border-b border-gray-200 flex items-center justify-between';
  
  const typeInfo = document.createElement('div');
  typeInfo.innerHTML = `
    <div class="text-xs font-medium text-gray-500 uppercase mb-1">Element Type</div>
    <div class="text-sm font-semibold text-gray-900">${node.type}</div>
  `;
  typeDisplay.appendChild(typeInfo);

  // Delete button
  const deleteButton = document.createElement('button');
  deleteButton.className = 'px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors border border-red-200 hover:border-red-300';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete this element?')) {
      deleteElement(element, node);
    }
  });
  typeDisplay.appendChild(deleteButton);
  
  content.appendChild(typeDisplay);

  // Render properties based on element type
  renderPropertiesForType(content as HTMLElement, element, node, (panel as any).__onUpdate);
}

/**
 * Render properties based on element type
 */
function renderPropertiesForType(
  container: HTMLElement,
  element: HTMLElement,
  node: ElementNode,
  onUpdate?: (elementId: string, updates: Record<string, any>) => void
): void {
  const type = node.type;

  // Common properties
  const commonSection = document.createElement('div');
  commonSection.className = 'mb-6';
  commonSection.innerHTML = '<div class="text-xs font-medium text-gray-500 uppercase mb-3">Common</div>';
  
  const commonProps = document.createElement('div');
  commonProps.className = 'space-y-3';

  // ID
  const idInput = createInput({
    label: 'ID',
    value: element.id || '',
    onChange: (e) => {
      const value = (e.target as HTMLInputElement).value;
      element.id = value;
      if (onUpdate) {
        onUpdate(node.id, { id: value });
      }
    },
  });
  commonProps.appendChild(idInput);

  // Class Name (excluding padding classes for containers - those are handled separately)
  const isContainer = element.hasAttribute('data-banana-container');
  const classNameValue = isContainer 
    ? removePaddingClasses(element.className || '')
    : (element.className || '');
  
  const classTextarea = createTextarea({
    label: 'Class Name',
    value: classNameValue,
    rows: 3,
    placeholder: 'banana-element border rounded-md...',
    onChange: (e) => {
      const value = (e.target as HTMLTextAreaElement).value;
      
      if (isContainer) {
        // For containers, preserve padding classes and merge with new classes
        const paddingClasses = (element.className || '').split(' ').filter((cls) => cls.match(/^p[tblrxy]?-\d+$/)).join(' ');
        element.className = `${value} ${paddingClasses}`.trim();
      } else {
        element.className = value;
      }
      
      if (onUpdate) {
        onUpdate(node.id, { className: element.className });
      }
    },
  });
  commonProps.appendChild(classTextarea);

  commonSection.appendChild(commonProps);
  container.appendChild(commonSection);

  // Type-specific properties
  switch (type) {
    case 'p':
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      renderTextProperties(container, element, node, onUpdate);
      break;
    case 'button':
      renderButtonProperties(container, element, node, onUpdate);
      break;
    case 'a':
      renderLinkProperties(container, element, node, onUpdate);
      break;
    case 'img':
      renderImageProperties(container, element, node, onUpdate);
      break;
    case 'input':
      renderInputProperties(container, element, node, onUpdate);
      break;
    case 'div':
    case 'section':
    case 'article':
      renderContainerProperties(container, element, node, onUpdate);
      break;
  }
}

function renderTextProperties(
  container: HTMLElement,
  element: HTMLElement,
  node: ElementNode,
  onUpdate?: (elementId: string, updates: Record<string, any>) => void
): void {
  const section = document.createElement('div');
  section.className = 'mb-6';
  section.innerHTML = '<div class="text-xs font-medium text-gray-500 uppercase mb-3">Text</div>';

  const props = document.createElement('div');
  props.className = 'space-y-3';

  const textInput = createInput({
    label: 'Text Content',
    value: element.textContent || '',
    onChange: (e) => {
      const value = (e.target as HTMLInputElement).value;
      element.textContent = value;
      if (onUpdate) {
        onUpdate(node.id, { textContent: value });
      }
    },
  });
  props.appendChild(textInput);

  section.appendChild(props);
  container.appendChild(section);
}

function renderButtonProperties(
  container: HTMLElement,
  element: HTMLElement,
  node: ElementNode,
  onUpdate?: (elementId: string, updates: Record<string, any>) => void
): void {
  const section = document.createElement('div');
  section.className = 'mb-6';
  section.innerHTML = '<div class="text-xs font-medium text-gray-500 uppercase mb-3">Button</div>';

  const props = document.createElement('div');
  props.className = 'space-y-3';

  const textInput = createInput({
    label: 'Button Text',
    value: element.textContent || '',
    onChange: (e) => {
      const value = (e.target as HTMLInputElement).value;
      element.textContent = value;
      if (onUpdate) {
        onUpdate(node.id, { textContent: value });
      }
    },
  });
  props.appendChild(textInput);

  section.appendChild(props);
  container.appendChild(section);
}

function renderLinkProperties(
  container: HTMLElement,
  element: HTMLElement,
  node: ElementNode,
  onUpdate?: (elementId: string, updates: Record<string, any>) => void
): void {
  const section = document.createElement('div');
  section.className = 'mb-6';
  section.innerHTML = '<div class="text-xs font-medium text-gray-500 uppercase mb-3">Link</div>';

  const props = document.createElement('div');
  props.className = 'space-y-3';

  const hrefInput = createInput({
    label: 'URL',
    type: 'url',
    value: (element as HTMLAnchorElement).href || '',
    onChange: (e) => {
      const value = (e.target as HTMLInputElement).value;
      (element as HTMLAnchorElement).href = value;
      if (onUpdate) {
        onUpdate(node.id, { href: value });
      }
    },
  });
  props.appendChild(hrefInput);

  const textInput = createInput({
    label: 'Link Text',
    value: element.textContent || '',
    onChange: (e) => {
      const value = (e.target as HTMLInputElement).value;
      element.textContent = value;
      if (onUpdate) {
        onUpdate(node.id, { textContent: value });
      }
    },
  });
  props.appendChild(textInput);

  section.appendChild(props);
  container.appendChild(section);
}

function renderImageProperties(
  container: HTMLElement,
  element: HTMLElement,
  node: ElementNode,
  onUpdate?: (elementId: string, updates: Record<string, any>) => void
): void {
  const section = document.createElement('div');
  section.className = 'mb-6';
  section.innerHTML = '<div class="text-xs font-medium text-gray-500 uppercase mb-3">Image</div>';

  const props = document.createElement('div');
  props.className = 'space-y-3';

  const srcInput = createInput({
    label: 'Image URL',
    type: 'url',
    value: (element as HTMLImageElement).src || '',
    onChange: (e) => {
      const value = (e.target as HTMLInputElement).value;
      (element as HTMLImageElement).src = value;
      if (onUpdate) {
        onUpdate(node.id, { src: value });
      }
    },
  });
  props.appendChild(srcInput);

  const altInput = createInput({
    label: 'Alt Text',
    value: (element as HTMLImageElement).alt || '',
    onChange: (e) => {
      const value = (e.target as HTMLInputElement).value;
      (element as HTMLImageElement).alt = value;
      if (onUpdate) {
        onUpdate(node.id, { alt: value });
      }
    },
  });
  props.appendChild(altInput);

  section.appendChild(props);
  container.appendChild(section);
}

function renderInputProperties(
  container: HTMLElement,
  element: HTMLElement,
  node: ElementNode,
  onUpdate?: (elementId: string, updates: Record<string, any>) => void
): void {
  const section = document.createElement('div');
  section.className = 'mb-6';
  section.innerHTML = '<div class="text-xs font-medium text-gray-500 uppercase mb-3">Input</div>';

  const props = document.createElement('div');
  props.className = 'space-y-3';

  const placeholderInput = createInput({
    label: 'Placeholder',
    value: (element as HTMLInputElement).placeholder || '',
    onChange: (e) => {
      const value = (e.target as HTMLInputElement).value;
      (element as HTMLInputElement).placeholder = value;
      if (onUpdate) {
        onUpdate(node.id, { placeholder: value });
      }
    },
  });
  props.appendChild(placeholderInput);

  section.appendChild(props);
  container.appendChild(section);
}

function renderContainerProperties(
  container: HTMLElement,
  element: HTMLElement,
  node: ElementNode,
  onUpdate?: (elementId: string, updates: Record<string, any>) => void
): void {
  const section = document.createElement('div');
  section.className = 'mb-6';
  section.innerHTML = '<div class="text-xs font-medium text-gray-500 uppercase mb-3">Container</div>';

  const props = document.createElement('div');
  props.className = 'space-y-3';

  // Get current padding (from Tailwind class or inline style)
  const currentPadding = element.style.padding || extractPaddingFromClass(element.className) || '';

  const paddingInput = createInput({
    label: 'Padding (e.g., 16px, 1rem, or leave empty)',
    value: currentPadding,
    placeholder: '16px or 1rem',
    onChange: (e) => {
      const value = (e.target as HTMLInputElement).value.trim();
      
      // Remove existing padding classes
      let newClassName = removePaddingClasses(element.className);
      
      if (value) {
        // Try to convert to Tailwind class first
        const tailwindClass = pixelsToTailwindClass(value, 'p');
        
        if (tailwindClass) {
          // Use Tailwind class
          newClassName = `${newClassName} ${tailwindClass}`.trim();
          element.className = newClassName;
          // Remove inline style if exists
          element.style.padding = '';
        } else {
          // Use inline style for custom values
          element.style.padding = value;
        }
      } else {
        // Remove padding completely
        element.style.padding = '';
      }
      
      element.className = newClassName;
      
      if (onUpdate) {
        onUpdate(node.id, { 
          className: newClassName,
          padding: value || null,
        });
      }
    },
  });
  props.appendChild(paddingInput);

  section.appendChild(props);
  container.appendChild(section);
}
