import { SiteConfig } from "@config";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) => {
    return z.object({
      author: z.string().default(SiteConfig.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default(["uncategorized"]),
      ogImage: image()
        .refine((img) => img.width === 1200 && img.height === 630, {
          message: "OG Image must be 1200x630",
        })
        .or(z.string())
        .optional(),
      description: z.string(),
      canonical: z.string().optional(),
    });
  },
});

// 导出 content 集合，后续可以在页面中使用
// PS：通过 import { getCollection } from "astro:content" 可以获取集合
export const collections = {
  blog,
};
