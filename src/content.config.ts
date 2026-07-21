import { Previews } from '@/lib/previews'
import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

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
      counterpartId: z.string()
    })
})

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
      colors: z.string(),
      techStack: z.array(
        z.object({
          title: z.string(),
          link: z.string().url()
        })
      ),
      challenge: z.string().optional(),
      solution: z.string().optional(),
      testimonial: z
        .object({
          name: z.string(),
          quote: z.string(),
          role: z.string()
        })
        .nullable(),
      comingSoon: z.boolean().optional(),
      counterpartId: z.string().optional()
    })
})

const snippetCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/snippets' }),
  schema: () =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      preview: z.nativeEnum(Previews),
      comingSoon: z.boolean().optional(),
      icon: z.enum(['code', 'block']),
      isNew: z.boolean().optional(),
      counterpartId: z.string().optional()
    })
})

export const collections = {
  blog: blogCollection,
  projects: projectCollection,
  snippets: snippetCollection
}
