import { z, defineCollection, reference } from 'astro:content'
import { glob } from 'astro/loaders'

// Typescript for the Blog Content
const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z
        .string()
        .max(
          70,
          'For optimize SEO, please provide a title with 60 characters or less'
        ),
      date: z.date(),
      excerpt: z.string(),
      author: z.string(),
      image: image(),
      imageAlt: z.string(),
      language: z.string()
    })
})

// Typescript for the Services
const serviceCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      title: z
        .string()
        .max(
          60,
          'For optimize SEO, please provide a title with 60 characters or less'
        ),
      excerpt: z.string(),
      image: image(),
      imageAlt: z.string(),
      techStack: z.array(
        z.object({
          link: z.string(),
          title: z.string(),
          image: z.string()
        })
      ),
      quote: z.string(),
      projects: z.array(reference('projects'))
    })
})

// Typescript for the Projects
const projectCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z
        .string()
        .max(
          60,
          'For optimize SEO, please provide a title with 60 characters or less'
        ),
      date: z.string(),
      excerpt: z.string(),
      images: z.array(
        z.object({
          src: image().optional(),
          alt: z.string()
        })
      ),
      liveLink: z.string().url(),
      repoLink: z.string().optional(),
      colors: z.array(z.string()),
      techStack: z.array(
        z.object({
          title: z.string(),
          info: z.string(),
          link: z.string().url()
        })
      ),
      challenge: z.string().optional(),
      solution: z.string().optional(),
      testimonial: z.object({
        name: z.string(),
        quote: z.string(),
        role: z.string()
      }),
      comingSoon: z.boolean().optional()
    })
})

export const collections = {
  blog: blogCollection,
  services: serviceCollection,
  projects: projectCollection
}
