import { userData } from '@/constants/site-data'
import { getPosts } from '@/lib/fetchers'
import type { CollectionEntry } from 'astro:content'

export const generateJsonLDForBlogPost = async (
  blog: CollectionEntry<'blog'>,
  lang: 'es' | 'en'
) => {
  const lastThreePosts = await getPosts(lang)
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `https://www.adrian-alvarez.dev/${lang}${blog.id}`,
        url: `https://www.adrian-alvarez.dev/${lang}${blog.id}`,
        headline: blog.data.title,
        name: blog.data.title,
        isPartOf: {
          '@id': 'https://www.adrian-alvarez.dev/#website'
        },
        primaryImageOfPage: {
          '@id': `https://www.adrian-alvarez.dev/${lang}${blog.id}/#primaryimage`
        },
        image: {
          '@id': `https://www.adrian-alvarez.dev/${lang}${blog.id}/#primaryimage`
        },
        thumbnailUrl: `https://www.adrian-alvarez.dev/${blog.data.image}`,
        datePublished: blog.data.date.toISOString(),
        dateModified:
          blog.data.date?.toISOString() || blog.data.date.toISOString(),
        description: blog.data.excerpt,
        author: {
          '@type': 'Person',
          name: blog.data.author || 'Adrian Alvarez'
        },
        publisher: {
          '@id': 'Adrian Alvarez Portfolio'
        },
        inLanguage: lang,
        potentialAction: [
          {
            '@type': 'ReadAction',
            target: [`https://www.adrian-alvarez.dev/${lang}${blog.id}/`]
          }
        ]
      },
      {
        '@type': 'ImageObject',
        inLanguage: lang,
        '@id': `https://www.adrian-alvarez.dev/${lang}${blog.id}/#primaryimage`,
        url: `https://www.adrian-alvarez.dev/${blog.data.image}`,
        contentUrl: `https://www.adrian-alvarez.dev/${blog.data.image}`,
        width: 972,
        height: 216
      },
      {
        '@type': 'WebSite',
        '@id': `https://www.adrian-alvarez.dev/${lang}`,
        url: `https://www.adrian-alvarez.dev/${lang}`,
        name: 'Adrian Alvarez Portfolio',
        description:
          lang === 'en'
            ? 'Web development and digital marketing'
            : 'Desarrollo web y marketing digital',
        publisher: {
          '@id': `https://www.adrian-alvarez.dev/${lang}`
        },
        potentialAction: [
          {
            '@type': 'ReadAction',
            target: [
              lastThreePosts
                .slice(0, 3)
                .map(
                  (post) => `https://www.adrian-alvarez.dev/${lang}${post.id}/`
                )
            ]
          }
        ],
        inLanguage: lang
      },
      {
        '@type': 'Organization',
        '@id': 'https://www.adrian-alvarez.dev',
        name: 'Adrian Alvarez Portfolio',
        url: `https://www.adrian-alvarez.dev/${lang}`,
        logo: {
          '@type': 'ImageObject',
          inLanguage: lang,
          '@id': 'https://www.adrian-alvarez.dev/favicon.ico',
          width: 644,
          height: 302,
          caption: 'Adrian Alvarez Portfolio'
        },
        image: {
          '@id': 'https://www.adrian-alvarez.dev/favicon.ico'
        },
        sameAs: [userData.social.map((media) => media.href)]
      }
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
    itemListElement: blogs.map((blog, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'BlogPosting',
        url: `https://www.adrian-alvarez.dev/${lang}/blog/${blog.id}/`,
        name: blog.data.title,
        headline: blog.data.title,
        description: blog.data.excerpt,
        datePublished: blog.data.date.toISOString(),
        image: [`https://www.adrian-alvarez.dev/${blog.data.image}`],
        author: [
          {
            '@type': 'Person',
            name: blog.data.author || 'Adrian Alvarez',
            url: `https://dev.to/n4n1t0`
          }
        ]
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
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        url: `https://www.adrian-alvarez.dev/${lang}/projects/${project.id}/`,
        name: project.data.title,
        description: project.data.excerpt,
        datePublished: project.data.date,
        image: project?.data?.images?.[0].src?.src || '/favicon.ico'
      }
    }))
  })
}

export const generateProjectJsonLD = (
  project: CollectionEntry<'projects'>,
  lang: 'es' | 'en'
) => {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `https://www.adrian-alvarez.dev/${lang}/projects/${project.id}/`,
    url: `https://www.adrian-alvarez.dev/${lang}/projects/${project.id}/`,
    name: project.data.title,
    description: project.data.excerpt,
    image: project?.data?.images?.[0].src?.src || '/favicon.ico',
    datePublished: project.data.date,
    publisher: {
      '@type': 'Organization',
      name: 'Adrian Alvarez Portfolio',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.adrian-alvarez.dev/favicon.ico'
      }
    }
  })
}

export const generateContactJsonLD = (lang: 'es' | 'en') => {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': 'https://www.adrian-alvarez.dev/contact/',
    url: 'https://www.adrian-alvarez.dev/contact/',
    name: 'Contact - Adrian Alvarez Portfolio',
    description:
      lang === 'en'
        ? 'Get in touch with Me for inquiries, support, and collaborations.'
        : 'Contacto para consultas, soporte y colaboraciones.',
    publisher: {
      '@type': 'Organization',
      name: 'Adrian Alvarez Portfolio',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.adrian-alvarez.dev/logo.webp'
      }
    }
  })
}
