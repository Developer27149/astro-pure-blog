import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead } from '../astro_BSXieQ9Q.mjs';

const $$Astro = createAstro("https://astro.build");
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`${maybeRenderHead()}<div>404 not found</div>`;
}, "/Users/aaron/repos/astro-pure-blog/src/pages/404.astro", void 0);

const $$file = "/Users/aaron/repos/astro-pure-blog/src/pages/404.astro";
const $$url = "/404";

export { $$404 as default, $$file as file, $$url as url };
