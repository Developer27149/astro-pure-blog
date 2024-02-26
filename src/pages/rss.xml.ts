import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedPosts from "@utils/getSortedPosts";
import type { APIRoute } from "astro";
import { SiteConfig } from "@config";

export const GET: APIRoute = async (req) => {
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
      pubDate: new Date(data.pubDatetime || data?.modDatetime),
    })),
  });
};
