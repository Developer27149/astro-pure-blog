import { A as AstroError, j as UnknownContentCollectionError, d as createComponent, k as renderUniqueStylesheet, l as renderScriptElement, n as createHeadAndContent, r as renderTemplate, o as renderComponent, u as unescapeHTML, c as createAstro, m as maybeRenderHead, i as addAttribute, p as renderSlot, q as renderHead, t as Fragment, v as renderTransition } from '../astro_BSXieQ9Q.mjs';
import { p as prependForwardSlash } from '../astro/assets-service_CBH0EuAm.mjs';
import { format } from 'timeago.js';
import { format as format$1 } from 'date-fns';
import { slug } from 'github-slugger';
/* empty css                          */
/* empty css                          */
/* empty css                          */

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
const cacheEntriesByCollection = /* @__PURE__ */ new Map();
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return;
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://astro.build", "ASSETS_PREFIX": undefined}, {})?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      entries = await Promise.all(
        lazyImports.map(async (lazyImport) => {
          const entry = await lazyImport();
          return type === "content" ? {
            id: entry.id,
            slug: entry.slug,
            body: entry.body,
            collection: entry.collection,
            data: entry.data,
            async render() {
              return render({
                collection: entry.collection,
                id: entry.id,
                renderEntryImport: await getRenderEntryImport(collection, entry.slug)
              });
            }
          } : {
            id: entry.id,
            collection: entry.collection,
            data: entry.data
          };
        })
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/adding-new-post.md": () => import('../adding-new-post_DP5lrKH6.mjs'),"/src/content/blog/astro-paper-2.md": () => import('../astro-paper-2_Dimd-3tx.mjs'),"/src/content/blog/astro-paper-3.md": () => import('../astro-paper-3_CIvafnZM.mjs'),"/src/content/blog/astro-paper-4.md": () => import('../astro-paper-4_CGe2-sZE.mjs'),"/src/content/blog/customizing-astropaper-theme-color-schemes.md": () => import('../customizing-astropaper-theme-color-schemes_D5L0dFGq.mjs'),"/src/content/blog/dynamic-og-images.md": () => import('../dynamic-og-images_CKZqaSnU.mjs'),"/src/content/blog/example-draft-post.md": () => import('../example-draft-post_BoIUcZ_s.mjs'),"/src/content/blog/how-to-add-a-new-social-icon.md": () => import('../how-to-add-a-new-social-icon_CA1808R8.mjs'),"/src/content/blog/how-to-add-an-estimated-reading-time.md": () => import('../how-to-add-an-estimated-reading-time_D_9YWKDR.mjs'),"/src/content/blog/how-to-configure-astropaper-theme.md": () => import('../how-to-configure-astropaper-theme_imu7BwZS.mjs'),"/src/content/blog/how-to-connect-astro-paper-blog-with-forestry-cms.md": () => import('../how-to-connect-astro-paper-blog-with-forestry-cms_DxYMK4RG.mjs'),"/src/content/blog/how-to-update-dependencies.md": () => import('../how-to-update-dependencies_CuROgM_k.mjs'),"/src/content/blog/portfolio-website-development.md": () => import('../portfolio-website-development_Dui0p-Rd.mjs'),"/src/content/blog/predefined-color-schemes.md": () => import('../predefined-color-schemes_UxRKIfGg.mjs'),"/src/content/blog/setting-dates-via-git-hooks.md": () => import('../setting-dates-via-git-hooks_2x-fJU1W.mjs'),"/src/content/blog/tailwind-typography.md": () => import('../tailwind-typography_uW2F9W90.mjs'),"/src/content/blog/terminal-development.md": () => import('../terminal-development_ClpQIzaX.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"blog":{"type":"content","entries":{"adding-new-posts-in-astropaper-theme":"/src/content/blog/adding-new-post.md","astro-paper-2":"/src/content/blog/astro-paper-2.md","astro-paper-v4":"/src/content/blog/astro-paper-4.md","customizing-astropaper-theme-color-schemes":"/src/content/blog/customizing-astropaper-theme-color-schemes.md","dynamic-og-image-generation-in-astropaper-blog-posts":"/src/content/blog/dynamic-og-images.md","how-to-add-a-new-social-icon":"/src/content/blog/how-to-add-a-new-social-icon.md","how-to-configure-astropaper-theme":"/src/content/blog/how-to-configure-astropaper-theme.md","example-draft-post":"/src/content/blog/example-draft-post.md","astro-paper-v3":"/src/content/blog/astro-paper-3.md","how-to-add-estimated-reading-time":"/src/content/blog/how-to-add-an-estimated-reading-time.md","how-to-connect-astro-paper-blog-with-forestry-cms":"/src/content/blog/how-to-connect-astro-paper-blog-with-forestry-cms.md","how-to-update-dependencies":"/src/content/blog/how-to-update-dependencies.md","how-do-i-develop-my-portfolio-and-blog":"/src/content/blog/portfolio-website-development.md","predefined-color-schemes":"/src/content/blog/predefined-color-schemes.md","setting-dates-via-git-hooks":"/src/content/blog/setting-dates-via-git-hooks.md","tailwind-typography":"/src/content/blog/tailwind-typography.md","how-do-i-develop-my-terminal-portfolio-website-with-react":"/src/content/blog/terminal-development.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/adding-new-post.md": () => import('../adding-new-post_DAIxwKbE.mjs'),"/src/content/blog/astro-paper-2.md": () => import('../astro-paper-2_BPqfEveP.mjs'),"/src/content/blog/astro-paper-3.md": () => import('../astro-paper-3_DYcDzu9g.mjs'),"/src/content/blog/astro-paper-4.md": () => import('../astro-paper-4_BgCGU1up.mjs'),"/src/content/blog/customizing-astropaper-theme-color-schemes.md": () => import('../customizing-astropaper-theme-color-schemes_BPnMcoY9.mjs'),"/src/content/blog/dynamic-og-images.md": () => import('../dynamic-og-images_DFDDmvrr.mjs'),"/src/content/blog/example-draft-post.md": () => import('../example-draft-post_BQ8wgPYp.mjs'),"/src/content/blog/how-to-add-a-new-social-icon.md": () => import('../how-to-add-a-new-social-icon_xLWm4pDF.mjs'),"/src/content/blog/how-to-add-an-estimated-reading-time.md": () => import('../how-to-add-an-estimated-reading-time_DQNR07Q6.mjs'),"/src/content/blog/how-to-configure-astropaper-theme.md": () => import('../how-to-configure-astropaper-theme_REM6Bme0.mjs'),"/src/content/blog/how-to-connect-astro-paper-blog-with-forestry-cms.md": () => import('../how-to-connect-astro-paper-blog-with-forestry-cms_CNnO8lT3.mjs'),"/src/content/blog/how-to-update-dependencies.md": () => import('../how-to-update-dependencies_DhyFuX4z.mjs'),"/src/content/blog/portfolio-website-development.md": () => import('../portfolio-website-development_BwnPOzSw.mjs'),"/src/content/blog/predefined-color-schemes.md": () => import('../predefined-color-schemes_C8il1hKF.mjs'),"/src/content/blog/setting-dates-via-git-hooks.md": () => import('../setting-dates-via-git-hooks_VCHvmFEJ.mjs'),"/src/content/blog/tailwind-typography.md": () => import('../tailwind-typography_BueSlOnV.mjs'),"/src/content/blog/terminal-development.md": () => import('../terminal-development_346a90mQ.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const SiteConfig = {
  website: "https://astro.build",
  author: "Developer27149",
  avatar: "https://avatars.githubusercontent.com/u/23721611?v=4",
  title: "AstroPureBlog",
  description: "AstroPureBlog is a blog template built with Astro.",
  ogImage: "https://images.unsplash.com/photo-1709315372141-e1f41dfad2dc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
  enableDarkMode: true,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1e3,
  contact: {
    email: "rivenqinyy@gmail.com",
    twitter: "https://twitter.com/miaocai0",
    github: "https://github.com/Developer27149"
  }
};

const postFilter = ({ data }) => {
  const isPublishTimePassed = Date.now() > new Date(data.pubDatetime).getTime() - SiteConfig.scheduledPostMargin;
  return !data.draft && isPublishTimePassed;
};

const getSortedPosts = (posts) => {
  return posts.filter(postFilter).sort(
    (a, b) => Math.floor(
      new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1e3
    ) - Math.floor(
      new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1e3
    )
  );
};

const $$Astro$9 = createAstro("https://astro.build");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="text-sm pt-32 text-center items-center flex gap-1 justify-center md:text-left pb-8 sm:pb-0"> <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" class="underline underline-offset-2 pr-2">
CC BY-NC-SA 4.0
</a>
2024 - PRESENT © ${SiteConfig.author}<a target="_blank"${addAttribute(SiteConfig.contact.github, "href")} class="hidden md:inline-block"></a> <a${addAttribute(SiteConfig.contact.twitter, "href")} class="i-mdi-twitter text-sky-500"></a> </footer>`;
}, "/Users/aaron/repos/astro-pure-blog/src/components/Footer.astro", void 0);

const $$Astro$8 = createAstro("https://astro.build");
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/Users/aaron/repos/astro-pure-blog/node_modules/.pnpm/astro@4.4.4_sass@1.71.1_typescript@5.3.3/node_modules/astro/components/ViewTransitions.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$7 = createAstro("https://astro.build");
const $$Default = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Default;
  const {
    title = SiteConfig.title,
    author = SiteConfig.author,
    description = SiteConfig.description,
    ogImage = SiteConfig.ogImage,
    canonicalURL = new URL(Astro2.url.pathname, Astro2.site).href,
    pubDatetime,
    modDatetime,
    scrollSmooth = true
  } = Astro2.props;
  const socialImageURL = new URL(
    ogImage ?? SiteConfig.ogImage ?? "og.jpg",
    Astro2.url.origin
  ).href;
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<html lang="zh-CN"', '> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="theme" content="light"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="canonical"', '><meta name="generator"', "><!-- General meta tags --><title>", '</title><meta name="title"', '><meta name="description"', '><meta name="auth"', '><!-- Sitemap --><link rel="sitemap" href="/sitemap-index.xml"><!-- open graph --><meta property="og:title"', '><meta property="og:description"', '><meta property="og:url"', '><meta property="og:image"', "><!-- Article Published/Modified time -->", "", '<!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><!-- scripts --><script src="/toggle-theme.js"><\/script>', "</head> <body> ", " ", " ", " </body></html>"])), addAttribute(`${scrollSmooth && "scroll-smooth"}`, "class"), addAttribute(canonicalURL, "href"), addAttribute(Astro2.generator, "content"), title, addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(author, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(canonicalURL, "content"), addAttribute(socialImageURL, "content"), pubDatetime && renderTemplate`<meta property="article:published_time"${addAttribute(pubDatetime.toISOString(), "content")}>`, modDatetime && renderTemplate`<meta property="article:modified_time"${addAttribute(modDatetime.toISOString(), "content")}>`, addAttribute(canonicalURL, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(socialImageURL, "content"), renderHead(), renderComponent($$result, "ViewTransitions", $$ViewTransitions, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
}, "/Users/aaron/repos/astro-pure-blog/src/layouts/default.astro", void 0);

const $$Astro$6 = createAstro("https://astro.build");
const $$MenuIcons = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$MenuIcons;
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<a href="/search" class="i-mdi-magnify hover:scale-110 text-sky-500 transition-all"></a><a href="/rss.xml" class="i-mdi-rss-box hover:scale-110 text-sky-500 transition-all"></a><a${addAttribute(SiteConfig.contact.twitter, "href")} target="_blank" class="i-mdi-twitter text-sky-500"></a><span class="theme-toggle cursor-pointer flex items-center hover:scale-110 text-sky-500 transition-all pr-2"><i class="i-mdi-lightbulb-on-10 dark:inline-block hidden"></i><i class="i-mdi-weather-night dark:hidden inline-block"></i></span>` })}`;
}, "/Users/aaron/repos/astro-pure-blog/src/components/Header/MenuIcons.astro", void 0);

const calcRelativeDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "zh_CN");
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$5 = createAstro("https://astro.build");
const $$Index$5 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Index$5;
  const { posts } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["", '<main> <h1 class="inline-block py-24 text-2xl font-semibold origin-center hover:scale-105 transition-all">\nBLOG\n</h1> <ul> ', ' </ul> </main> <div id="description-elem" style="left: var(--x);bottom: var(--y);" class="absolute transition-all z-[999] bg-gray-800 text-sky-100 dark:bg-gray-900 rounded-sm shadow dark:text-sky-300 max-w-[400px]"></div> <script>\n  // thanks for the code: https://stackoverflow.com/questions/7790725/javascript-track-mouse-position\n  function handleMouseMove(event) {\n    var eventDoc, doc, body;\n    event = event || window.event; // IE-ism\n    // If pageX/Y aren\'t available and clientX/Y are,\n    // calculate pageX/Y - logic taken from jQuery.\n    // (This is to support old IE)\n    if (event.pageX == null && event.clientX != null) {\n      eventDoc = (event.target && event.target.ownerDocument) || document;\n      doc = eventDoc.documentElement;\n      body = eventDoc.body;\n      event.pageX =\n        event.clientX +\n        ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -\n        ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);\n      event.pageY =\n        event.clientY +\n        ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -\n        ((doc && doc.clientTop) || (body && body.clientTop) || 0);\n    }\n    // get window\'s width\n    const windowWidth = window.innerWidth;\n    // Use event.pageX / event.pageY here\n    const calibrateX = Math.min(event.pageX + 60, windowWidth - 460);\n\n    document\n      .getElementById("description-elem")\n      .style.setProperty("--x", `${calibrateX}px`);\n    document\n      .getElementById("description-elem")\n      .style.setProperty("--y", `calc(100vh - ${event.pageY + 24}px)`);\n  }\n\n  document.body.addEventListener("mousemove", handleMouseMove);\n\n  const posts = document.querySelectorAll("main li a[data-description]");\n  const descriptionElem = document.getElementById("description-elem");\n  descriptionElem.addEventListener("animationend", () => {\n    if (descriptionElem.classList.contains("animate-jump-out")) {\n      descriptionElem.classList.add("hidden");\n    }\n  });\n  let noder;\n  posts.forEach((post) => {\n    post.addEventListener("mouseenter", () => {\n      noder = setTimeout(() => {\n        descriptionElem.classList.remove("hidden");\n        descriptionElem.classList.add("animate-jump");\n        descriptionElem.classList.add("p-2");\n        descriptionElem.classList.remove("animate-jump-out");\n        const description = post.getAttribute("data-description");\n        descriptionElem.innerHTML = description;\n      }, 1000 * 0.8);\n    });\n    post.addEventListener("mouseleave", () => {\n      clearTimeout(noder);\n      descriptionElem.classList.remove("animate-jump");\n      descriptionElem.classList.add("animate-jump-out");\n    });\n  });\n<\/script>'], ["", '<main> <h1 class="inline-block py-24 text-2xl font-semibold origin-center hover:scale-105 transition-all">\nBLOG\n</h1> <ul> ', ' </ul> </main> <div id="description-elem" style="left: var(--x);bottom: var(--y);" class="absolute transition-all z-[999] bg-gray-800 text-sky-100 dark:bg-gray-900 rounded-sm shadow dark:text-sky-300 max-w-[400px]"></div> <script>\n  // thanks for the code: https://stackoverflow.com/questions/7790725/javascript-track-mouse-position\n  function handleMouseMove(event) {\n    var eventDoc, doc, body;\n    event = event || window.event; // IE-ism\n    // If pageX/Y aren\'t available and clientX/Y are,\n    // calculate pageX/Y - logic taken from jQuery.\n    // (This is to support old IE)\n    if (event.pageX == null && event.clientX != null) {\n      eventDoc = (event.target && event.target.ownerDocument) || document;\n      doc = eventDoc.documentElement;\n      body = eventDoc.body;\n      event.pageX =\n        event.clientX +\n        ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -\n        ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);\n      event.pageY =\n        event.clientY +\n        ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -\n        ((doc && doc.clientTop) || (body && body.clientTop) || 0);\n    }\n    // get window\'s width\n    const windowWidth = window.innerWidth;\n    // Use event.pageX / event.pageY here\n    const calibrateX = Math.min(event.pageX + 60, windowWidth - 460);\n\n    document\n      .getElementById("description-elem")\n      .style.setProperty("--x", \\`\\${calibrateX}px\\`);\n    document\n      .getElementById("description-elem")\n      .style.setProperty("--y", \\`calc(100vh - \\${event.pageY + 24}px)\\`);\n  }\n\n  document.body.addEventListener("mousemove", handleMouseMove);\n\n  const posts = document.querySelectorAll("main li a[data-description]");\n  const descriptionElem = document.getElementById("description-elem");\n  descriptionElem.addEventListener("animationend", () => {\n    if (descriptionElem.classList.contains("animate-jump-out")) {\n      descriptionElem.classList.add("hidden");\n    }\n  });\n  let noder;\n  posts.forEach((post) => {\n    post.addEventListener("mouseenter", () => {\n      noder = setTimeout(() => {\n        descriptionElem.classList.remove("hidden");\n        descriptionElem.classList.add("animate-jump");\n        descriptionElem.classList.add("p-2");\n        descriptionElem.classList.remove("animate-jump-out");\n        const description = post.getAttribute("data-description");\n        descriptionElem.innerHTML = description;\n      }, 1000 * 0.8);\n    });\n    post.addEventListener("mouseleave", () => {\n      clearTimeout(noder);\n      descriptionElem.classList.remove("animate-jump");\n      descriptionElem.classList.add("animate-jump-out");\n    });\n  });\n<\/script>'])), maybeRenderHead(), posts.map(({ slug: slug$1, data }, idx) => renderTemplate`<li class="group flex items-center gap-12 md:gap-8 py-2 animate-fade-left mb-2"${addAttribute(`animation-delay:${idx * 70}ms`, "style")}${addAttribute(renderTransition($$result, "vrwun4mt", "", slug(slug$1)), "data-astro-transition-scope")}> <span class="hidden md:inline-block rounded-sm p-[2px] px-[4px] text-sm min-w-[100px]"> ${calcRelativeDate(data.modDatetime ?? data.pubDatetime)} </span> <span class="md:hidden inline-block rounded-sm p-[2px] px-[4px] skew-x-6"> ${format$1(new Date(data.modDatetime ?? data.pubDatetime), "yyyy/MM")} </span> <a class="group-hover:underline underline-offset-4 font-thin decoration-sky-200 transition-all cursor-pointer dark:text-teal-300" style=""${addAttribute(`/posts/${slug$1}`, "href")}${addAttribute(data.description, "data-description")}> ${slug$1} </a> </li>`));
}, "/Users/aaron/repos/astro-pure-blog/src/ui/posts/index.astro", "self");

const $$Astro$4 = createAstro("https://astro.build");
const $$Index$4 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Index$4;
  const { activeNav } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header class="flex gap-2 items-center text-sm md:text-[18px] relative" data-astro-cid-z6iz25dn> <a href="/" class="p-1 bg-sky-400 dark:bg-sky-100/10 dark:text-gray-100 text-white overflow-hidden flex items-center rounded-l-full rounded-r-md gap-2 mr-auto sm:mr-4 pr-2 font-semibold" data-astro-cid-z6iz25dn> <img${addAttribute(SiteConfig.avatar, "src")} class="w-6 h-6 rounded-full animate-spin animate-duration-[5s]" data-astro-cid-z6iz25dn> <span class="animate-fade-up" data-astro-cid-z6iz25dn>${SiteConfig.author}</span> </a> <a href="/posts"${addAttribute([
    "hover:opacity-100 transition-all",
    activeNav === "posts" ? "active-nav" : "opacity-70"
  ], "class:list")} data-astro-cid-z6iz25dn>Posts</a> <span class="scale-50 opacity-50" data-astro-cid-z6iz25dn>/</span> <a href="/projects"${addAttribute([
    "hover:opacity-100 transition-all",
    activeNav === "projects" ? "active-nav" : "opacity-70"
  ], "class:list")} data-astro-cid-z6iz25dn>Projects</a> <span class="scale-50 opacity-50" data-astro-cid-z6iz25dn>/</span> <a href="/weekly"${addAttribute([
    "hover:opacity-100 transition-all",
    activeNav === "weekly" ? "active-nav" : "opacity-70"
  ], "class:list")} data-astro-cid-z6iz25dn>weekly</a> <div class="ml-auto flex-nowrap items-center gap-4 hidden sm:flex animate-flip-up" data-astro-cid-z6iz25dn> ${renderComponent($$result, "MenuIcons", $$MenuIcons, { "data-astro-cid-z6iz25dn": true })} </div> <div class="absolute top-[100%] w-full flex pt-8 text-[20px] gap-4 sm:hidden animate-flip-up" data-astro-cid-z6iz25dn> ${renderComponent($$result, "MenuIcons", $$MenuIcons, { "data-astro-cid-z6iz25dn": true })} </div> </header> `;
}, "/Users/aaron/repos/astro-pure-blog/src/components/Header/index.astro", void 0);

const $$Astro$3 = createAstro("https://astro.build");
const $$Index$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Index$3;
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts).slice(0, 100);
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$Default, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Index$4, { "activeNav": "posts" })} ${renderComponent($$result2, "Posts", $$Index$5, { "posts": sortedPosts })} ` })}`;
}, "/Users/aaron/repos/astro-pure-blog/src/pages/posts/index.astro", void 0);

const $$file$3 = "/Users/aaron/repos/astro-pure-blog/src/pages/posts/index.astro";
const $$url$3 = "/posts";

const index$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$3,
    file: $$file$3,
    url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro("https://astro.build");
const $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$2;
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts).slice(0, 100);
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$Default, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Index$4, { "activeNav": "projects" })} ${renderComponent($$result2, "Posts", $$Index$5, { "posts": sortedPosts })} ` })}`;
}, "/Users/aaron/repos/astro-pure-blog/src/pages/projects/index.astro", void 0);

const $$file$2 = "/Users/aaron/repos/astro-pure-blog/src/pages/projects/index.astro";
const $$url$2 = "/projects";

const index$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$2,
    file: $$file$2,
    url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro("https://astro.build");
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts).slice(0, 100);
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$Default, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Index$4, { "activeNav": "weekly" })} ${renderComponent($$result2, "Posts", $$Index$5, { "posts": sortedPosts })} ` })}`;
}, "/Users/aaron/repos/astro-pure-blog/src/pages/weekly/index.astro", void 0);

const $$file$1 = "/Users/aaron/repos/astro-pure-blog/src/pages/weekly/index.astro";
const $$url$1 = "/weekly";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$1,
    file: $$file$1,
    url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("https://astro.build");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$Default, { "title": "123" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>404
<p>Page not found</p> </h1>` })}`;
}, "/Users/aaron/repos/astro-pure-blog/src/pages/index.astro", void 0);

const $$file = "/Users/aaron/repos/astro-pure-blog/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$MenuIcons as $, SiteConfig as S, getSortedPosts as a, $$Default as b, index$2 as c, index$1 as d, index as e, getCollection as g, index$3 as i };
