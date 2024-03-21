import { S as SiteConfig } from './index_BPqQeGLB.mjs';

const robots = `
User-agent: Googlebot
Disallow: /nogooglebot/

User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", SiteConfig.website).href}
`;
const GET = () => new Response(robots, {
  headers: {
    "Content-Type": "text/plain"
  }
});

export { GET };
