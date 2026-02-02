/**
 * Virtual tree structure for managing element hierarchy
 */

import type { ElementNode } from './types';

export class ElementTree {
  private root: ElementNode | null = null;
  private nodes: Map<string, ElementNode> = new Map();

  constructor(root?: ElementNode) {
    if (root) {
      this.root = root;
      this.buildIndex(root);
    }
  }

  private buildIndex(node: ElementNode): void {
    this.nodes.set(node.id, node);
    node.children.forEach((child) => {
      child.parent = node.id;
      this.buildIndex(child);
    });
  }

  getNode(id: string): ElementNode | undefined {
    return this.nodes.get(id);
  }

  getRoot(): ElementNode | null {
    return this.root;
  }

  addNode(node: ElementNode, parentId?: string): void {
    if (!this.root) {
      this.root = node;
      this.buildIndex(node);
      return;
    }

    const parent = parentId ? this.nodes.get(parentId) : this.root;
    if (parent) {
      parent.children.push(node);
      node.parent = parent.id;
      this.buildIndex(node);
    }
  }

  removeNode(id: string): boolean {
    const node = this.nodes.get(id);
    if (!node || !node.parent) return false;

    const parent = this.nodes.get(node.parent);
    if (parent) {
      parent.children = parent.children.filter((child) => child.id !== id);
      this.nodes.delete(id);
      return true;
    }
    return false;
  }

  moveNode(nodeId: string, newParentId: string, index?: number): boolean {
    const node = this.nodes.get(nodeId);
    const newParent = this.nodes.get(newParentId);
    
    if (!node || !newParent) return false;

    // Remove from old parent
    if (node.parent) {
      const oldParent = this.nodes.get(node.parent);
      if (oldParent) {
        oldParent.children = oldParent.children.filter((child) => child.id !== nodeId);
      }
    }

    // Add to new parent
    node.parent = newParentId;
    if (index !== undefined) {
      newParent.children.splice(index, 0, node);
    } else {
      newParent.children.push(node);
    }

    return true;
  }

  serialize(): ElementNode | null {
    return this.root;
  }

  deserialize(data: ElementNode): void {
    this.root = data;
    this.nodes.clear();
    this.buildIndex(data);
  }
}
