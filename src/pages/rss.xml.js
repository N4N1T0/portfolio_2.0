import { getPosts } from '@/lib'
import rss from '@astrojs/rss'

export async function GET(context) {
  const blog = await getPosts('en')
  return rss({
    title: 'Adrian Alvarez Blog',
    description:
      'Cuban-born and self-taught, I bring a unique blend of passion and proficiency to development and design. Obsessed with performance and dedicated to crafting clean, impactful designs, my work is a testament to the fusion of skill and creativity.',
    site: context.site,
    stylesheet: '/rss/styles.xsl',
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      author: post.data.author,
      link: `/en/blog/${post.id}`
    }))
  })
}
