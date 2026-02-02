/**
 * Drag and Drop Engine using Pointer Events API
 * Core implementation for BananaJS visual editor
 */

import type { DragState, DropZone } from './types';

export class DragDropEngine {
  private dragState: DragState = {
    isDragging: false,
    draggedElement: null,
    currentDropZone: null,
    startPosition: { x: 0, y: 0 },
    currentPosition: { x: 0, y: 0 },
  };

  private container: HTMLElement;
  private dropZones: Map<string, DropZone> = new Map();
  private dragElement: HTMLElement | null = null;
  private ghostElement: HTMLElement | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.container.addEventListener('pointerdown', (e) => this.handlePointerDown(e));
    this.container.addEventListener('pointermove', (e) => this.handlePointerMove(e));
    this.container.addEventListener('pointerup', (e) => this.handlePointerUp(e));
  }

  registerDropZone(id: string, element: HTMLElement, accepts: string[] = []): void {
    const bounds = element.getBoundingClientRect();
    this.dropZones.set(id, {
      id,
      element,
      accepts,
      bounds,
    });
    
    // Add visual indicator for drop zones
    if (element.hasAttribute('data-banana-container')) {
      element.classList.add('banana-drop-zone');
    }
  }

  unregisterDropZone(id: string): void {
    this.dropZones.delete(id);
  }

  private handlePointerDown(e: PointerEvent): void {
    const target = e.target as HTMLElement;
    const draggable = target.closest('[data-draggable]') as HTMLElement;
    
    if (!draggable) return;

    // Prevent default text selection
    e.preventDefault();
    e.stopPropagation();

    this.dragState.isDragging = true;
    this.dragState.startPosition = { x: e.clientX, y: e.clientY };
    this.dragState.currentPosition = { x: e.clientX, y: e.clientY };
    this.dragElement = draggable;

    // Create ghost element
    this.createGhostElement(draggable, e.clientX, e.clientY);
    
    // Set pointer capture
    draggable.setPointerCapture(e.pointerId);
    
    // Prevent text selection during drag
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';
  }

  private handlePointerMove(e: PointerEvent): void {
    if (!this.dragState.isDragging || !this.dragElement) return;

    this.dragState.currentPosition = { x: e.clientX, y: e.clientY };

    // Update ghost position (centered on cursor)
    if (this.ghostElement) {
      this.ghostElement.style.top = `${e.clientY}px`;
      this.ghostElement.style.left = `${e.clientX}px`;
    }

    // Find drop zone
    const dropZone = this.findDropZone(e.clientX, e.clientY);
    this.dragState.currentDropZone = dropZone;

    // Visual feedback
    this.updateDropZoneFeedback(dropZone);
  }

  private handlePointerUp(_e: PointerEvent): void {
    if (!this.dragState.isDragging) return;

    if (this.dragState.currentDropZone && this.dragElement) {
      this.handleDrop(this.dragElement, this.dragState.currentDropZone);
    }

    this.cleanup();
  }

  private findDropZone(x: number, y: number): DropZone | null {
    // Update bounds for all drop zones (in case of scrolling/resizing)
    this.dropZones.forEach((zone) => {
      zone.bounds = zone.element.getBoundingClientRect();
    });

    // Find all matching drop zones (nested containers)
    const matchingZones: DropZone[] = [];
    
    for (const zone of this.dropZones.values()) {
      const rect = zone.bounds;
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        matchingZones.push(zone);
      }
    }

    if (matchingZones.length === 0) return null;

    // Return the smallest (most nested) drop zone
    // This ensures we drop into the innermost container
    matchingZones.sort((a, b) => {
      const areaA = a.bounds.width * a.bounds.height;
      const areaB = b.bounds.width * b.bounds.height;
      return areaA - areaB; // Smallest first
    });

    return matchingZones[0];
  }

  private createGhostElement(element: HTMLElement, x: number, y: number): void {
    this.ghostElement = element.cloneNode(true) as HTMLElement;
    this.ghostElement.style.position = 'fixed';
    this.ghostElement.style.top = `${y}px`;
    this.ghostElement.style.left = `${x}px`;
    this.ghostElement.style.opacity = '0.6';
    this.ghostElement.style.pointerEvents = 'none';
    this.ghostElement.style.zIndex = '10000';
    this.ghostElement.style.transform = 'translate(-50%, -50%)';
    this.ghostElement.style.width = `${element.offsetWidth}px`;
    this.ghostElement.style.backgroundColor = 'white';
    this.ghostElement.style.border = '2px dashed #3b82f6';
    this.ghostElement.style.borderRadius = '0.375rem';
    this.ghostElement.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    document.body.appendChild(this.ghostElement);
  }

  private updateDropZoneFeedback(zone: DropZone | null): void {
    // Remove previous feedback from ALL zones
    this.dropZones.forEach((z) => {
      z.element.classList.remove('banana-drop-zone-active', 'banana-drop-zone-hover');
    });

    // Add feedback ONLY to the current (innermost) zone
    if (zone) {
      zone.element.classList.add('banana-drop-zone-active', 'banana-drop-zone-hover');
      
      // Remove feedback from parent containers
      let parent = zone.element.parentElement;
      while (parent) {
        if (parent.hasAttribute('data-banana-container') || parent.hasAttribute('data-banana-canvas')) {
          parent.classList.remove('banana-drop-zone-active', 'banana-drop-zone-hover');
        }
        parent = parent.parentElement;
      }
    }
  }

  private handleDrop(element: HTMLElement, zone: DropZone): void {
    // Emit drop event or call callback
    const event = new CustomEvent('banana:drop', {
      detail: {
        element,
        dropZone: zone,
      },
    });
    this.container.dispatchEvent(event);
  }

  private cleanup(): void {
    this.dragState.isDragging = false;
    this.dragState.draggedElement = null;
    this.dragState.currentDropZone = null;
    
    if (this.ghostElement) {
      this.ghostElement.remove();
      this.ghostElement = null;
    }

    this.updateDropZoneFeedback(null);
    this.dragElement = null;
  }
}
