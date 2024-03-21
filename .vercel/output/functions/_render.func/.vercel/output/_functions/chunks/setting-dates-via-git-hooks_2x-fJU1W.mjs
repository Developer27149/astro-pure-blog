const id = "setting-dates-via-git-hooks.md";
						const collection = "blog";
						const slug = "setting-dates-via-git-hooks";
						const body = "\nIn this post I will explain how to use the pre-commit Git hook to automate the input of the created (`pubDatetime`) and modified (`modDatetime`) in the AstroPaper blog theme frontmatter\n\n## Table of contents\n\n## Have them Everywhere\n\n[Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) are great for automating tasks like [adding](https://gist.github.com/SSmale/3b380e5bbed3233159fb7031451726ea) or [checking](https://itnext.io/using-git-hooks-to-enforce-branch-naming-policy-ffd81fa01e5e) the branch name to your commit messages or [stopping you committing plain text secrets](https://gist.github.com/SSmale/367deee757a9b2e119d241e120249000). Their biggest flaw is that client-side hooks are per machine.\n\nYou can get around this by having a `hooks` directory and manually copy them to the `.git/hooks` directory or set up a symlink, but this all requires you to remember to set it up, and that is not something I am good at doing.\n\nAs this project uses npm, we are able to make use of a package called [Husky](https://typicode.github.io/husky/) (this is already installed in AstroPaper) to automatically install the hooks for us.\n\n## The Hook\n\nAs we want this hook to run as we commit the code to update the dates and then have that as part of our change we are going to use the `pre-commit` hook. This has already been set up by this AstroPaper project, but if it hadn't, you would run `npx husky add .husky/pre-commit 'echo \"This is our new pre-commit hook\"'`.\n\nNavigating to the `hooks/pre-commit` file, we are going to add one or both of the following snippets.\n\n### Updating the modified date when a file is edited\n\n---\n\nUPDATE:\n\nThis section has been updated with a new version of the hook that is smarter. It will now not increment the `modDatetime` until the post is published. On the first publish, set the draft status to `first` and watch the magic happen.\n\n---\n\n```shell\n# Modified files, update the modDatetime\ngit diff --cached --name-status |\ngrep -i '^M.*\\.md$' |\nwhile read _ file; do\n  filecontent=$(cat \"$file\")\n  frontmatter=$(echo \"$filecontent\" | awk -v RS='---' 'NR==2{print}')\n  draft=$(echo \"$frontmatter\" | awk '/^draft: /{print $2}')\n  if [ \"$draft\" = \"false\" ]; then\n    echo \"$file modDateTime updated\"\n    cat $file | sed \"/---.*/,/---.*/s/^modDatetime:.*$/modDatetime: $(date -u \"+%Y-%m-%dT%H:%M:%SZ\")/\" > tmp\n    mv tmp $file\n    git add $file\n  fi\n  if [ \"$draft\" = \"first\" ]; then\n    echo \"First release of $file, draft set to false and modDateTime removed\"\n    cat $file | sed \"/---.*/,/---.*/s/^modDatetime:.*$/modDatetime:/\" | sed \"/---.*/,/---.*/s/^draft:.*$/draft: false/\" > tmp\n    mv tmp $file\n    git add $file\n  fi\ndone\n```\n\n`git diff --cached --name-status` gets the files from git that have been staged for committing. The output looks like:\n\n```shell\nA       src/content/blog/setting-dates-via-git-hooks.md\n```\n\nThe letter at the start denotes what action has been taken, in the above example the file has been added. Modified files have `M`\n\nWe pipe that output into the grep command where we are looking at each line to find that have been modified. The line needs to start with `M` (`^(M)`), have any number of characters after that (`.*`) and end with the `.md` file extension (`.(md)$`).This is going to filter out the lines that are not modified markdown files `egrep -i \"^(M).*\\.(md)$\"`.\n\n---\n\n#### Improvement - More Explicit\n\nThis could be added to only look for files that we markdown files in the `blog` directory, as these are the only ones that will have the right frontmatter\n\n---\n\nThe regex will capture the two parts, the letter and the file path. We are going to pipe this list into a while loop to iterate over the matching lines and assign the letter to `a` and the path to `b`. We are going to ignore `a` for now.\n\nTo know the draft staus of the file, we need its frontmatter. In the following code we are using `cat` to get the content of the file, then using `awk` to split the file on the frontmatter separator (`---`) and taking the second block (the fonmtmatter, the bit between the `---`). From here we are using `awk` again to find the draft key and print is value.\n\n```shell\n  filecontent=$(cat \"$file\")\n  frontmatter=$(echo \"$filecontent\" | awk -v RS='---' 'NR==2{print}')\n  draft=$(echo \"$frontmatter\" | awk '/^draft: /{print $2}')\n```\n\nNow we have the value for `draft` we are going to do 1 of 3 things, set the modDatetime to now (when draft is false `if [ \"$draft\" = \"false\" ]; then`), clear the modDatetime and set draft to false (when draft is set to first `if [ \"$draft\" = \"first\" ]; then`), or nothing (in any other case).\n\nThe next part with the sed command is a bit magical to me as I don't often use it, it was copied from [another blog post on doing something similar](https://mademistakes.com/notes/adding-last-modified-timestamps-with-git/). In essence, it is looking inside the frontmatter tags (`---`) of the file to find the `pubDatetime:` key, getting the full line and replacing it with the `pubDatetime: $(date -u \"+%Y-%m-%dT%H:%M:%SZ\")/\"` same key again and the current datetime formatted correctly.\n\nThis replacement is in the context of the whole file so we put that into a temporary file (`> tmp`), then we move (`mv`) the new file into the location of the old file, overwriting it. This is then added to git ready to be committed as if we made the change ourselves.\n\n---\n\n#### NOTE\n\nFor the `sed` to work the frontmatter needs to already have the `modDatetime` key in the frontmatter. There are some other changes you will need to make for the app to build with a blank date, see [further down](#empty-moddatetime-changes)\n\n---\n\n### Adding the Date for new files\n\nAdding the date for a new file is the same process as above, but this time we are looking for lines that have been added (`A`) and we are going to replace the `pubDatetime` value.\n\n```shell\n# New files, add/update the pubDatetime\ngit diff --cached --name-status | egrep -i \"^(A).*\\.(md)$\" | while read a b; do\n  cat $b | sed \"/---.*/,/---.*/s/^pubDatetime:.*$/pubDatetime: $(date -u \"+%Y-%m-%dT%H:%M:%SZ\")/\" > tmp\n  mv tmp $b\n  git add $b\ndone\n```\n\n---\n\n#### Improvement - Only Loop Once\n\nWe could use the `a` variable to switch inside the loop and either update the `modDatetime` or add the `pubDatetime` in one loop.\n\n---\n\n## Populating the frontmatter\n\nIf your IDE supports snippets then there is the option to create a custom snippet to populate the frontmatter.[In AstroPaper v4 will come with one for VSCode by default.](https://github.com/satnaing/astro-paper/pull/206)\n\n<video autoplay muted=\"muted\" controls plays-inline=\"true\" class=\"border border-skin-line\">\n  <source src=\"https://github.com/satnaing/astro-paper/assets/17761689/e13babbc-2d78-405d-8758-ca31915e41b0\" type=\"video/mp4\">\n</video>\n\n## Empty `modDatetime` changes\n\nTo allow Astro to compile the markdown and do its thing, it needs to know what is expected in the frontmatter. It does this via the config in `src/content/config.ts`\n\nTo allow the key to be there with no value we need to edit line 10 to add the `.nullable()` function.\n\n```typescript\nconst blog = defineCollection({\n  type: \"content\",\n  schema: ({ image }) =>\n    z.object({\n      author: z.string().default(SITE.author),\n      pubDatetime: z.date(),\n-     modDatetime: z.date().optional(),\n+     modDatetime: z.date().optional().nullable(),\n      title: z.string(),\n      featured: z.boolean().optional(),\n      draft: z.boolean().optional(),\n      tags: z.array(z.string()).default([\"others\"]),\n      ogImage: image()\n        .refine(img => img.width >= 1200 && img.height >= 630, {\n          message: \"OpenGraph image must be at least 1200 X 630 pixels!\",\n        })\n        .or(z.string())\n        .optional(),\n      description: z.string(),\n      canonicalURL: z.string().optional(),\n      readingTime: z.string().optional(),\n    }),\n});\n```\n\nTo stop the IDE complaining in the blog engine files I have also done the following:\n\n1. added `| null` to line 15 in `src/layouts/Layout.astro` so that it looks like\n\n```typescript\nexport interface Props {\n  title?: string;\n  author?: string;\n  description?: string;\n  ogImage?: string;\n  canonicalURL?: string;\n  pubDatetime?: Date;\n  modDatetime?: Date | null;\n}\n```\n\n<!-- This needs to be 2 as it doesn't pick it up with the code block -->\n\n2. added `| null` to line 5 in `src/components/Datetime.tsx` so that it looks like\n\n```typescript\ninterface DatetimesProps {\n  pubDatetime: string | Date;\n  modDatetime: string | Date | undefined | null;\n}\n```\n";
						const data = {author:"Simon Smale",pubDatetime:new Date(1704314408000),modDatetime:new Date(1704740345000),title:"How to use Git Hooks to set Created and Modified Dates",draft:false,tags:["docs","FAQ"],description:"How to use Git Hooks to set your Created and Modified Dates on AstroPaper"};
						const _internal = {
							type: 'content',
							filePath: "/Users/aaron/repos/astro-pure-blog/src/content/blog/setting-dates-via-git-hooks.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
