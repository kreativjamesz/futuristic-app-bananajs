/**
 * Tailwind CSS Utilities
 * Helper functions for working with Tailwind classes
 */

/**
 * Extract padding value from Tailwind class
 * Returns padding in pixels or null if not found
 */
export function extractPaddingFromClass(className: string): string | null {
  // Match Tailwind padding classes: p-{value}, px-{value}, py-{value}, pt-{value}, etc.
  const paddingPatterns = [
    /p-(\d+)/,           // p-4, p-8
    /px-(\d+)/,          // px-4
    /py-(\d+)/,          // py-4
    /pt-(\d+)/,          // pt-4
    /pr-(\d+)/,          // pr-4
    /pb-(\d+)/,          // pb-4
    /pl-(\d+)/,          // pl-4
  ];

  for (const pattern of paddingPatterns) {
    const match = className.match(pattern);
    if (match) {
      const value = parseInt(match[1], 10);
      // Convert Tailwind spacing (1 = 0.25rem = 4px) to pixels
      return `${value * 4}px`;
    }
  }

  return null;
}

/**
 * Remove padding classes from className
 */
export function removePaddingClasses(className: string): string {
  return className
    .split(' ')
    .filter((cls) => !cls.match(/^p[tblrxy]?-\d+$/))
    .join(' ')
    .trim();
}

/**
 * Convert pixels to Tailwind class if possible
 */
export function pixelsToTailwindClass(value: string, type: 'p' | 'px' | 'py' = 'p'): string | null {
  // Parse value (e.g., "16px", "1rem", "16")
  const numMatch = value.match(/(\d+)/);
  if (!numMatch) return null;

  const pixels = parseInt(numMatch[1], 10);
  
  // Convert to Tailwind spacing unit (4px = 1 unit)
  const tailwindUnit = pixels / 4;
  
  // Only return if it's a whole number (Tailwind only supports integers)
  if (tailwindUnit === Math.floor(tailwindUnit) && tailwindUnit > 0) {
    return `${type}-${tailwindUnit}`;
  }

  return null;
}
