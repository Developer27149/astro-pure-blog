import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { SiteConfig } from "./src/config";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: SiteConfig.website,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "dracula",
    },
  },
});