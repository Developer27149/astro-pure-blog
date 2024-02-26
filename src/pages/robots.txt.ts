import { SiteConfig } from "@config";
import type { APIRoute } from "astro";

const robots = `
User-agent: Googlebot
Disallow: /nogooglebot/

User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", SiteConfig.website).href}
`;

export const GET: APIRoute = () =>
  new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
