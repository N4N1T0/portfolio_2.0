import { getCollection, getEntry, type CollectionEntry } from 'astro:content'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
+ * Replaces spaces in a string with hyphens.
+ *
+ * @param {string} name - The string to modify.
+ * @return {string} The modified string with hyphens instead of spaces.
+ */
export const urlNames = (name: string): string => {
  return name.split(' ').join('-').toLowerCase()
}

export const desUrlNames = (name: string, capitalize: boolean): string => {
  return capitalize
    ? name.split('-').join(' ')
    : name
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

/**
+ * Retrieves an array of blog posts in a specified language.
+ *
+ * @param {string} lang - The language of the blog posts to retrieve.
+ * @param {number} limit - The maximum number of posts to retrieve.
+ * @return {Promise<Array<CollectionEntry<'blog'>>>} A promise that resolves to an array of blog posts.
+ */
export async function getPosts(
  lang: 'es' | 'en',
  limit?: number | undefined
): Promise<Array<CollectionEntry<'blog'>>> {
  const posts = await getCollection('blog', ({ data }) => {
    return data.language === lang
  })

  const formattedPosts = posts
    .slice(0, limit || posts.length)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((post) => {
      const refactoredId =
        lang === 'es'
          ? post.id.replace(/es\//g, '/')
          : post.id.replace(/en\//g, '/')
      return {
        ...post,
        id: refactoredId
      }
    })

  return formattedPosts
}

/**
 * Retrieves the first blog post in a specified language.
 *
 * @param {string} lang - The language of the blog posts to retrieve.
 * @return {Promise<CollectionEntry<'blog'> | undefined>} A promise that resolves to the first blog post or undefined if no posts are found.
 */

export async function getFirstPost(
  lang: 'es' | 'en'
): Promise<CollectionEntry<'blog'>> {
  const posts = await getPosts(lang)
  return posts[0]
}

/**
 * Retrieves an array of services in a specified language.
 *
 * @param {string} lang - The language of the services to retrieve.
 * @return {Promise<Array<CollectionEntry<"services">>>} A promise that resolves to an array of services.
 */
export async function getServices(
  lang: string
): Promise<Array<CollectionEntry<'services'>>> {
  const services = (
    await getCollection('services', ({ id }) => {
      return id.startsWith(lang)
    })
  ).map((service) => {
    const refactoredId =
      lang === 'es'
        ? service.id.replace(/es\//g, '/')
        : service.id.replace(/en\//g, '/')
    return {
      ...service,
      id: refactoredId
    }
  })

  return services
}

/**
 * Returns the correct border color for a given className.
 *
 * @param {string} [className] - The className to check.
 * @return {string} The correct border color.
 */
export function getBorderColor(className?: string): string {
  if (!className) return 'border-foreground'

  return className.includes('background')
    ? 'border-background'
    : 'border-foreground'
}

/**
 * Returns the correct border color for a given className.
 *
 * @param {string} [className] - The className to check.
 * @return {string} The correct border color.
 */
export function getHoverBorderColor(className?: string): string {
  if (!className) return 'hover-underline-animation'

  return className.includes('background')
    ? 'hover-underline-animation'
    : 'hover-underline-animation-reverse'
}

/**
 * Retrieves an array of projects in a specified language.
 *
 * @param {string} lang - The language of the projects to retrieve.
 * @return {Promise<Array<CollectionEntry<"projects">>>} A promise that resolves to an array of projects.
 */
export async function getProjects(
  lang: string,
  limit?: number | undefined
): Promise<Array<CollectionEntry<'projects'>>> {
  const projects = await getCollection('projects', ({ id }) =>
    id.startsWith(lang)
  )

  const formattedProjects = projects
    .slice(0, limit || projects.length)
    .sort((a, b) => {
      const aDate = new Date(a.data.date).valueOf()
      const bDate = new Date(b.data.date).valueOf()
      return bDate - aDate
    })
    .map((project) => {
      const refactoredId =
        lang === 'es'
          ? project.id.replace(/es\//g, '/')
          : project.id.replace(/en\//g, '/')
      return {
        ...project,
        id: refactoredId
      }
    })

  return formattedProjects
}

/**
 * Retrieves a collection entry by its id and language.
 *
 * @param {string} id - The id of the collection entry.
 * @return {Promise<CollectionEntry<"projects"> | undefined>} A promise that resolves to the collection entry.
 */
export async function getCollectionBySlug(
  id: string
): Promise<CollectionEntry<'projects'> | undefined> {
  const projects = await getEntry('projects', id)
  return projects
}

/**
 * A utility function that merges and normalizes CSS class names using Tailwind CSS.
 *
 * @param {string | undefined | string[]} inputs - The CSS class names to merge.
 * @return {string | undefined} - The merged and normalized CSS class names.
 *
 * @example
 * cn('bg-red-500', 'text-white', 'rounded-full', 'p-2') // 'bg-red-500 text-white rounded-full p-2'
 * cn('bg-red-500', undefined, 'rounded-full', 'p-2') // 'bg-red-500 rounded-full p-2'
 * cn('bg-red-500', [], 'rounded-full', 'p-2') // 'bg-red-500 rounded-full p-2'
 */
export function cn(...inputs: Array<string | undefined>): string | undefined {
  return twMerge(clsx(inputs))
}
