import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function for constructing class names conditionally.
 * Combines clsx for conditional class joining and tailwind-merge to handle Tailwind CSS class conflicts.
 *
 * @param inputs - Class values to be conditionally joined
 * @returns A string of merged class names
 *
 * @example
 * // Basic usage
 * cn('text-red-500', 'bg-blue-500')
 *
 * @example
 * // Conditional classes
 * cn('text-base', isLarge && 'text-lg', isError && 'text-red-500')
 *
 * @example
 * // With Tailwind conflicts resolved
 * cn('px-2 py-1', 'py-2') // 'px-2 py-2'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
