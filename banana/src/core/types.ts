/**
 * Core types for BananaJS
 * Visual page builder type definitions
 */

export interface ElementNode {
  id: string;
  type: string;
  props: Record<string, any>;
  children: ElementNode[];
  parent?: string;
  styles?: Record<string, string>;
}

export interface DropZone {
  id: string;
  element: HTMLElement;
  accepts: string[];
  bounds: DOMRect;
}

export interface DragState {
  isDragging: boolean;
  draggedElement: ElementNode | null;
  currentDropZone: DropZone | null;
  startPosition: { x: number; y: number };
  currentPosition: { x: number; y: number };
}

export interface BananaJSConfig {
  container: HTMLElement | string;
  elements?: ElementNode[];
  onUpdate?: (elements: ElementNode[]) => void;
}
