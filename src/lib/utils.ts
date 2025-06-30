import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS classes with clsx utility
 * @param inputs - Array of class values to be merged
 * @returns Merged and deduplicated class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date string into a long month and year format
 * @param date - Date string to format
 * @returns Formatted date string in "Month Year" format
 */
export const formatDate = (date: string) => {
  const formattedDate = new Date(date)
  return formattedDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })
}

/**
 * Checks if the current URL path is for blog or projects section
 * @param url - URL object to check
 * @returns Boolean indicating if path is blog or projects
 */
export const getIsBlogOrProject = (url: URL) => {
  const pathname = url.pathname
  const pathArray = pathname.split('/')
  return pathArray[1] === 'blog' || pathArray[1] === 'projects'
}

/**
 * Gets the section type from URL path
 * @param url - URL object to check
 * @returns 'blog' or 'projects' if path matches, undefined otherwise
 */
export const getBlogOrProject = (url: URL): 'blog' | 'projects' | undefined => {
  const pathname = url.pathname
  const pathArray = pathname.split('/')
  const blogOrProject = pathArray[2]

  switch (blogOrProject) {
    case 'blog':
      return 'blog'
    case 'projects':
      return 'projects'
    default:
      return undefined
  }
}
