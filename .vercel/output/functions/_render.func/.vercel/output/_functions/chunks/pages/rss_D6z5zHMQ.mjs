import rss from '@astrojs/rss';
import { g as getCollection, a as getSortedPosts, S as SiteConfig } from './index_C5Y-AERP.mjs';

const GET = async (req) => {
  const posts = await getCollection("blog");
  const orderPost = getSortedPosts(posts);
  return rss({
    title: SiteConfig.title,
    description: SiteConfig.description,
    site: SiteConfig.website,
    items: orderPost.map(({ data, slug }) => ({
      link: `posts/${slug}`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.pubDatetime || data?.modDatetime)
    }))
  });
};

export { GET };
