import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string) => {
  const formattedDate = new Date(date)
  return formattedDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })
}

export function idToSlug(id: string) {
  return id.replace(/\s+/g, '-').toLowerCase()
}
