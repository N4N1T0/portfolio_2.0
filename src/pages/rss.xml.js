import { getPosts } from '@/lib/fetchers'
import rss from '@astrojs/rss'

export async function GET(context) {
  const blog = await getPosts('en')
  return rss({
    title: 'Adrián Álvarez — Blog',
    description:
      'Writing on fullstack development, APIs, data, performance and product. Technical decisions and trade-offs, without the fluff.',
    site: context.site,
    stylesheet: '/rss/styles.xsl',
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      author: post.data.author,
      link: `/en/blog/${post.id}/`
    }))
  })
}
