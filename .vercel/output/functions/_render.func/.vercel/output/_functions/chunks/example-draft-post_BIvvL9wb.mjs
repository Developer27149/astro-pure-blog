import { d as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_BSXieQ9Q.mjs';

const html = "<p>Users cannot see this post because it is in draft.</p>\n<h2 id=\"motivation\">Motivation</h2>\n<p>rec 1</p>";

				const frontmatter = {"title":"Example Draft Post","author":"Sat Naing","pubDatetime":"2022-06-06T04:06:31.000Z","slug":"example-draft-post","featured":false,"draft":true,"tags":["TypeScript","Astro"],"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est"};
				const file = "/Users/aaron/repos/astro-pure-blog/src/content/blog/example-draft-post.md";
				const url = undefined;
				function rawContent() {
					return "\nUsers cannot see this post because it is in draft.\n\n## Motivation\n\nrec 1\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"motivation","text":"Motivation"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
