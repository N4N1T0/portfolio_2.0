import { getCollection, type CollectionEntry } from 'astro:content'

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
  const posts = await getCollection('blog', ({ id }) => {
    return id.startsWith(lang)
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
 * Retrieves a specific blog post by its ID and language.
 *
 * @param {string} id - The ID of the blog post to retrieve.
 * @return {Promise<CollectionEntry<'blog'> | undefined>} A promise that resolves to the blog post or undefined if not found.
 */
export async function getPostById(
  id: string
): Promise<CollectionEntry<'blog'> | undefined> {
  const posts = await getCollection('blog')

  const post = posts.find((post) => post.id === id)

  if (!post) return undefined
  return post
}

/**
 * Retrieves a specific project by its ID.
 *
 * @param {string} id - The ID of the project to retrieve.
 * @return {Promise<CollectionEntry<'projects'> | undefined>} A promise that resolves to the project or undefined if not found.
 */
export async function getProjectById(
  id: string
): Promise<CollectionEntry<'projects'> | undefined> {
  const projects = await getCollection('projects')

  const project = projects.find((project) => project.id === id)

  if (!project) return undefined
  return project
}

/**
 * Retrieves the counterpart blog post ID for a given blog post ID.
 *
 * @param {string} id - The ID of the blog post to find the counterpart for.
 * @param {string} lang - The language of the blog post to retrieve.
 * @return {Promise<string | undefined>} A promise that resolves to the counterpart blog post ID or undefined if not found.
 */
export async function getCounterpartById(
  id: string,
  lang: 'es' | 'en',
  blogOrProject: 'blog' | 'projects' | undefined
): Promise<string | undefined> {
  let actualPostOrProject: CollectionEntry<'blog' | 'projects'> | undefined =
    undefined

  if (blogOrProject === 'blog') {
    actualPostOrProject = await getPostById(`${lang}/${id}`)
  } else {
    actualPostOrProject = await getProjectById(`${lang}/${id}`)
  }

  if (!actualPostOrProject) return undefined

  const counterpartBlog = await getPostById(
    actualPostOrProject.data.counterpartId as string
  )

  if (!counterpartBlog) return undefined

  return counterpartBlog.id
}
