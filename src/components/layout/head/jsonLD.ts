import { USER_DATA } from '@/constants/site-data'
import type { CollectionEntry } from 'astro:content'

const SITE_URL = (
  import.meta.env.SITE ?? 'https://www.adrian-alvarez.com'
).replace(/\/$/, '')

const absolute = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path}`

const personNode = (lang: 'es' | 'en') => ({
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Adrian Alvarez',
  url: `${SITE_URL}/${lang}/`,
  jobTitle:
    lang === 'en'
      ? 'Senior Fullstack Engineer'
      : 'Desarrollador Fullstack Senior',
  sameAs: USER_DATA.social.map((social) => social.href)
})

const websiteNode = (lang: 'es' | 'en') => ({
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/${lang}/`,
  name: 'Adrian Alvarez Portfolio',
  description:
    lang === 'en'
      ? 'Senior Fullstack Engineer. APIs, interfaces and data systems in production.'
      : 'Desarrollador Fullstack Senior. APIs, interfaces y sistemas de datos en producción.',
  inLanguage: lang,
  publisher: { '@id': `${SITE_URL}/#person` }
})

const imageObject = (src: string, lang: 'es' | 'en') => ({
  '@type': 'ImageObject',
  inLanguage: lang,
  url: absolute(src),
  contentUrl: absolute(src)
})

export const generateHomeJsonLD = (lang: 'es' | 'en') =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [websiteNode(lang), personNode(lang)]
  })

export const generateJsonLDForBlogPost = async (
  blog: CollectionEntry<'blog'>,
  lang: 'es' | 'en'
) => {
  const url = `${SITE_URL}/${lang}/blog/${blog.id}/`
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        url,
        headline: blog.data.title,
        name: blog.data.title,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        primaryImageOfPage: { '@id': `${url}#primaryimage` },
        image: { '@id': `${url}#primaryimage` },
        datePublished: blog.data.date.toISOString(),
        dateModified: blog.data.date.toISOString(),
        description: blog.data.excerpt,
        author: { '@id': `${SITE_URL}/#person` },
        publisher: { '@id': `${SITE_URL}/#person` },
        inLanguage: lang,
        potentialAction: {
          '@type': 'ReadAction',
          target: [url]
        }
      },
      {
        ...imageObject(blog.data.image.src, lang),
        '@id': `${url}#primaryimage`
      },
      websiteNode(lang),
      personNode(lang)
    ]
  })
}

export const generateBlogListJsonLD = (
  blogs: Array<CollectionEntry<'blog'>>,
  lang: 'es' | 'en'
) => {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: lang === 'en' ? 'Blog' : 'Blog',
    inLanguage: lang,
    itemListElement: blogs.map((blog, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'BlogPosting',
        url: `${SITE_URL}/${lang}/blog/${blog.id}/`,
        name: blog.data.title,
        headline: blog.data.title,
        description: blog.data.excerpt,
        datePublished: blog.data.date.toISOString(),
        image: [absolute(blog.data.image.src)],
        author: { '@id': `${SITE_URL}/#person` }
      }
    }))
  })
}

export const generateProjectListJsonLD = (
  projects: Array<CollectionEntry<'projects'>>,
  lang: 'es' | 'en'
) => {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: lang === 'en' ? 'Projects' : 'Proyectos',
    inLanguage: lang,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        url: `${SITE_URL}/${lang}/projects/${project.id}/`,
        name: project.data.title,
        description: project.data.excerpt,
        datePublished: project.data.date,
        image: absolute(project?.data?.images?.[0]?.src?.src || '/favicon.ico')
      }
    }))
  })
}

export const generateSnippetJsonLD = (
  snippet: CollectionEntry<'snippets'>,
  lang: 'es' | 'en'
) => {
  const url = `${SITE_URL}/${lang}/snippets/${snippet.id}/`
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${url}#article`,
        url,
        name: snippet.data.title,
        description: snippet.data.excerpt,
        inLanguage: lang,
        author: { '@id': `${SITE_URL}/#person` },
        publisher: { '@id': `${SITE_URL}/#organization` }
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Adrian Alvarez',
        url: `${SITE_URL}/${lang}/`
      },
      websiteNode(lang),
      personNode(lang)
    ]
  })
}

export const generateProjectJsonLD = (
  project: CollectionEntry<'projects'>,
  lang: 'es' | 'en'
) => {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${SITE_URL}/${lang}/projects/${project.id}/`,
    url: `${SITE_URL}/${lang}/projects/${project.id}/`,
    name: project.data.title,
    description: project.data.excerpt,
    image: absolute(project?.data?.images?.[0]?.src?.src || '/favicon.ico'),
    datePublished: project.data.date,
    inLanguage: lang,
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` }
  })
}
