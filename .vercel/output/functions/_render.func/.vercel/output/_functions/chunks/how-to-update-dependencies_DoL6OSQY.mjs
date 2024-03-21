import { d as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_BSXieQ9Q.mjs';

const html = "<p>Updating the dependencies of a project can be tedious. However, neglecting to update project dependencies is not a good idea either 😬. In this post, I will share how I usually update my projects, focusing on AstroPaper as an example. Nonetheless, these steps can be applied to other js/node projects as well.</p>\n<p><img src=\"/assets/forrest-gump-quote.webp\" alt=\"Forrest Gump Fake Quote\"></p>\n<h2 id=\"table-of-contents\">Table of contents</h2>\n<p></p><details><summary>Open Table of contents</summary><p></p>\n<ul>\n<li><a href=\"#updating-package-dependencies\">Updating Package Dependencies</a></li>\n<li><a href=\"#updating-astropaper-template\">Updating AstroPaper template</a>\n<ul>\n<li><a href=\"#files-and-directories-to-keep-in-mind\">Files and Directories to keep in mind</a></li>\n<li><a href=\"#updating-astropaper-using-git\">Updating AstroPaper using Git</a></li>\n</ul>\n</li>\n<li><a href=\"#conclusion\">Conclusion</a></li>\n</ul>\n<p></p></details><p></p>\n<h2 id=\"updating-package-dependencies\">Updating Package Dependencies</h2>\n<p>There are several ways to update dependencies, and I’ve tried various methods to find the easiest path. One way to do it is by manually updating each package using <code>npm install package-name@latest</code>. This method is the most straightforward way of updating. However, it may not be the most efficient option.</p>\n<p>My recommended way of updating dependencies is by using the <a href=\"https://www.npmjs.com/package/npm-check-updates\">npm-check-updates package</a>. There’s a good <a href=\"https://www.freecodecamp.org/news/how-to-update-npm-dependencies/\">article</a> from freeCodeCamp about that, so I won’t be explaining the details of what it is and how to use that package. Instead, I’ll show you my typical approach.</p>\n<p>First, install <code>npm-check-updates</code> package globally.</p>\n<pre class=\"astro-code dracula\" style=\"background-color:#282A36;color:#F8F8F2; overflow-x: auto;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#50FA7B\">npm</span><span style=\"color:#F1FA8C\"> install</span><span style=\"color:#BD93F9\"> -g</span><span style=\"color:#F1FA8C\"> npm-check-updates</span></span></code></pre>\n<p>Before making any updates, it’s a good idea to check all new dependencies that can be updated.</p>\n<pre class=\"astro-code dracula\" style=\"background-color:#282A36;color:#F8F8F2; overflow-x: auto;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#50FA7B\">ncu</span></span></code></pre>\n<p>Most of the time, patch dependencies can be updated without affecting the project at all. So, I usually update patch dependencies by running either <code>ncu -i --target patch</code> or <code>ncu -u --target patch</code>. The difference is that <code>ncu -u --target patch</code> will update all the patches, while <code>ncu -i --target patch</code> will give an option to toggle which package to update. It’s up to you to decide which approach to take.</p>\n<p>The next part involves updating minor dependencies. Minor package updates usually won’t break the project, but it is always good to check the release notes of the respective packages. These minor updates often include some cool features that can be applied to our projects.</p>\n<pre class=\"astro-code dracula\" style=\"background-color:#282A36;color:#F8F8F2; overflow-x: auto;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#50FA7B\">ncu</span><span style=\"color:#BD93F9\"> -i</span><span style=\"color:#BD93F9\"> --target</span><span style=\"color:#F1FA8C\"> minor</span></span></code></pre>\n<p>Last but not least, there might be some major package updates in the dependencies. So, check the rest of the dependency updates by running</p>\n<pre class=\"astro-code dracula\" style=\"background-color:#282A36;color:#F8F8F2; overflow-x: auto;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#50FA7B\">ncu</span><span style=\"color:#BD93F9\"> -i</span></span></code></pre>\n<p>If there are any major updates (or some updates you still have to make), the above command will output those remaining packages. If the package is a major version update, you have to be very careful since this will likely break the whole project. Therefore, please read the respective release note (or) docs very carefully and make changes accordingly.</p>\n<p>If you run <code>ncu -i</code> and found no more packages to be updated, <em><strong>Congrats!!!</strong></em> you have successfully updated all the dependencies in your project.</p>\n<h2 id=\"updating-astropaper-template\">Updating AstroPaper template</h2>\n<p>Like other open-source projects, AstroPaper is evolving with bug fixes, feature updates, and so on. So if you’re someone who is using AstroPaper as a template, you might also want to update the template when there’s a new release.</p>\n<p>The thing is, you might already have updated the template according to your flavor. Therefore, I can’t exactly show <strong>“the one-size-fits-all perfect way”</strong> to update the template to the most recent release. However, here are some tips to update the template without breaking your repo. Keep in mind that, most of the time, updating the package dependencies might be sufficient for you.</p>\n<h3 id=\"files-and-directories-to-keep-in-mind\">Files and Directories to keep in mind</h3>\n<p>In most cases, the files and directories you might not want to override (as you’ve likely updated those files) are <code>src/content/blog/</code>, <code>src/config.ts</code>, <code>src/pages/about.md</code>, and other assets &#x26; styles like <code>public/</code> and <code>src/styles/base.css</code>.</p>\n<p>If you’re someone who only updates the bare minimum of the template, it should be okay to replace everything with the latest AstroPaper except the above files and directories. It’s like pure Android OS and other vendor-specific OSes like OneUI. The less you modify the base, the less you have to update.</p>\n<p>You can manually replace every file one by one, or you can use the magic of git to update everything. I won’t show you the manual replacement process since it is very straightforward. If you’re not interested in that straightfoward and inefficient method, bear with me 🐻.</p>\n<h3 id=\"updating-astropaper-using-git\">Updating AstroPaper using Git</h3>\n<p><strong>IMPORTANT!!!</strong></p>\n<blockquote>\n<p>Only do the following if you know how to resolve merge conflicts. Otherwise, you’d better replace files manually or update dependencies only.</p>\n</blockquote>\n<p>First, add astro-paper as the remote in your project.</p>\n<pre class=\"astro-code dracula\" style=\"background-color:#282A36;color:#F8F8F2; overflow-x: auto;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#50FA7B\">git</span><span style=\"color:#F1FA8C\"> remote</span><span style=\"color:#F1FA8C\"> add</span><span style=\"color:#F1FA8C\"> astro-paper</span><span style=\"color:#F1FA8C\"> https://github.com/satnaing/astro-paper.git</span></span></code></pre>\n<p>Checkout to a new branch in order to update the template. If you know what you’re doing and you’re confident with your git skill, you can omit this step.</p>\n<pre class=\"astro-code dracula\" style=\"background-color:#282A36;color:#F8F8F2; overflow-x: auto;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#50FA7B\">git</span><span style=\"color:#F1FA8C\"> checkout</span><span style=\"color:#BD93F9\"> -b</span><span style=\"color:#F1FA8C\"> build/update-astro-paper</span></span></code></pre>\n<p>Then, pull the changes from astro-paper by running</p>\n<pre class=\"astro-code dracula\" style=\"background-color:#282A36;color:#F8F8F2; overflow-x: auto;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#50FA7B\">git</span><span style=\"color:#F1FA8C\"> pull</span><span style=\"color:#F1FA8C\"> astro-paper</span><span style=\"color:#F1FA8C\"> main</span></span></code></pre>\n<p>If you face <code>fatal: refusing to merge unrelated histories</code> error, you can resolve that by running the following command</p>\n<pre class=\"astro-code dracula\" style=\"background-color:#282A36;color:#F8F8F2; overflow-x: auto;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#50FA7B\">git</span><span style=\"color:#F1FA8C\"> pull</span><span style=\"color:#F1FA8C\"> astro-paper</span><span style=\"color:#F1FA8C\"> main</span><span style=\"color:#BD93F9\"> --allow-unrelated-histories</span></span></code></pre>\n<p>After running the above command, you’re likely to encounter conflicts in your project. You’ll need to resolve these conflicts manually and make the necessary adjustments according to your needs.</p>\n<p>After resolving the conflicts, test your blog thoroughly to ensure everything is working as expected. Check your articles, components, and any customizations you made.</p>\n<p>Once you’re satisfied with the result, it’s time to merge the update branch into your main branch (only if you are updating the template in another branch). Congratulations! You’ve successfully updated your template to the latest version. Your blog is now up-to-date and ready to shine! 🎉</p>\n<h2 id=\"conclusion\">Conclusion</h2>\n<p>In this article, I’ve shared some of my insights and processes for updating dependencies and the AstroPaper template. I genuinely hope this article proves valuable and assists you in managing your projects more efficiently.</p>\n<p>If you have any alternative or improved approaches for updating dependencies/AstroPaper, I would love to hear from you. Thus, don’t hesitate to start a discussion in the repository, email me, or open an issue. Your input and ideas are highly appreciated!</p>\n<p>Please understand that my schedule is quite busy these days, and I may not be able to respond quickly. However, I promise to get back to you as soon as possible. 😬</p>\n<p>Thank you for taking the time to read this article, and I wish you all the best with your projects!</p>";

				const frontmatter = {"title":"How to update dependencies of AstroPaper","author":"Sat Naing","pubDatetime":"2023-07-20T15:33:05.569Z","slug":"how-to-update-dependencies","featured":false,"draft":false,"ogImage":"/assets/forrest-gump-quote.webp","tags":["FAQ"],"description":"How to update project dependencies and AstroPaper template."};
				const file = "/Users/aaron/repos/astro-pure-blog/src/content/blog/how-to-update-dependencies.md";
				const url = undefined;
				function rawContent() {
					return "\nUpdating the dependencies of a project can be tedious. However, neglecting to update project dependencies is not a good idea either 😬. In this post, I will share how I usually update my projects, focusing on AstroPaper as an example. Nonetheless, these steps can be applied to other js/node projects as well.\n\n![Forrest Gump Fake Quote](/assets/forrest-gump-quote.webp)\n\n## Table of contents\n\n## Updating Package Dependencies\n\nThere are several ways to update dependencies, and I've tried various methods to find the easiest path. One way to do it is by manually updating each package using `npm install package-name@latest`. This method is the most straightforward way of updating. However, it may not be the most efficient option.\n\nMy recommended way of updating dependencies is by using the [npm-check-updates package](https://www.npmjs.com/package/npm-check-updates). There's a good [article](https://www.freecodecamp.org/news/how-to-update-npm-dependencies/) from freeCodeCamp about that, so I won't be explaining the details of what it is and how to use that package. Instead, I'll show you my typical approach.\n\nFirst, install `npm-check-updates` package globally.\n\n```bash\nnpm install -g npm-check-updates\n```\n\nBefore making any updates, it’s a good idea to check all new dependencies that can be updated.\n\n```bash\nncu\n```\n\nMost of the time, patch dependencies can be updated without affecting the project at all. So, I usually update patch dependencies by running either `ncu -i --target patch` or `ncu -u --target patch`. The difference is that `ncu -u --target patch` will update all the patches, while `ncu -i --target patch` will give an option to toggle which package to update. It’s up to you to decide which approach to take.\n\nThe next part involves updating minor dependencies. Minor package updates usually won't break the project, but it is always good to check the release notes of the respective packages. These minor updates often include some cool features that can be applied to our projects.\n\n```bash\nncu -i --target minor\n```\n\nLast but not least, there might be some major package updates in the dependencies. So, check the rest of the dependency updates by running\n\n```bash\nncu -i\n```\n\nIf there are any major updates (or some updates you still have to make), the above command will output those remaining packages. If the package is a major version update, you have to be very careful since this will likely break the whole project. Therefore, please read the respective release note (or) docs very carefully and make changes accordingly.\n\nIf you run `ncu -i` and found no more packages to be updated, _**Congrats!!!**_ you have successfully updated all the dependencies in your project.\n\n## Updating AstroPaper template\n\nLike other open-source projects, AstroPaper is evolving with bug fixes, feature updates, and so on. So if you’re someone who is using AstroPaper as a template, you might also want to update the template when there’s a new release.\n\nThe thing is, you might already have updated the template according to your flavor. Therefore, I can’t exactly show **\"the one-size-fits-all perfect way\"** to update the template to the most recent release. However, here are some tips to update the template without breaking your repo. Keep in mind that, most of the time, updating the package dependencies might be sufficient for you.\n\n### Files and Directories to keep in mind\n\nIn most cases, the files and directories you might not want to override (as you've likely updated those files) are `src/content/blog/`, `src/config.ts`, `src/pages/about.md`, and other assets & styles like `public/` and `src/styles/base.css`.\n\nIf you’re someone who only updates the bare minimum of the template, it should be okay to replace everything with the latest AstroPaper except the above files and directories. It’s like pure Android OS and other vendor-specific OSes like OneUI. The less you modify the base, the less you have to update.\n\nYou can manually replace every file one by one, or you can use the magic of git to update everything. I won’t show you the manual replacement process since it is very straightforward. If you’re not interested in that straightfoward and inefficient method, bear with me 🐻.\n\n### Updating AstroPaper using Git\n\n**IMPORTANT!!!**\n\n> Only do the following if you know how to resolve merge conflicts. Otherwise, you’d better replace files manually or update dependencies only.\n\nFirst, add astro-paper as the remote in your project.\n\n```bash\ngit remote add astro-paper https://github.com/satnaing/astro-paper.git\n```\n\nCheckout to a new branch in order to update the template. If you know what you’re doing and you’re confident with your git skill, you can omit this step.\n\n```bash\ngit checkout -b build/update-astro-paper\n```\n\nThen, pull the changes from astro-paper by running\n\n```bash\ngit pull astro-paper main\n```\n\nIf you face `fatal: refusing to merge unrelated histories` error, you can resolve that by running the following command\n\n```bash\ngit pull astro-paper main --allow-unrelated-histories\n```\n\nAfter running the above command, you’re likely to encounter conflicts in your project. You'll need to resolve these conflicts manually and make the necessary adjustments according to your needs.\n\nAfter resolving the conflicts, test your blog thoroughly to ensure everything is working as expected. Check your articles, components, and any customizations you made.\n\nOnce you're satisfied with the result, it's time to merge the update branch into your main branch (only if you are updating the template in another branch). Congratulations! You've successfully updated your template to the latest version. Your blog is now up-to-date and ready to shine! 🎉\n\n## Conclusion\n\nIn this article, I've shared some of my insights and processes for updating dependencies and the AstroPaper template. I genuinely hope this article proves valuable and assists you in managing your projects more efficiently.\n\nIf you have any alternative or improved approaches for updating dependencies/AstroPaper, I would love to hear from you. Thus, don't hesitate to start a discussion in the repository, email me, or open an issue. Your input and ideas are highly appreciated!\n\nPlease understand that my schedule is quite busy these days, and I may not be able to respond quickly. However, I promise to get back to you as soon as possible. 😬\n\nThank you for taking the time to read this article, and I wish you all the best with your projects!\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"table-of-contents","text":"Table of contents"},{"depth":2,"slug":"updating-package-dependencies","text":"Updating Package Dependencies"},{"depth":2,"slug":"updating-astropaper-template","text":"Updating AstroPaper template"},{"depth":3,"slug":"files-and-directories-to-keep-in-mind","text":"Files and Directories to keep in mind"},{"depth":3,"slug":"updating-astropaper-using-git","text":"Updating AstroPaper using Git"},{"depth":2,"slug":"conclusion","text":"Conclusion"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
