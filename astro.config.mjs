// // @ts-check
// import { defineConfig } from 'astro/config';

// // https://astro.build/config
// export default defineConfig({});

 import { defineConfig } from 'astro/config';
 import remarkMath from 'remark-math';
 import rehypeKatex from 'rehype-katex';

 export default defineConfig({
   markdown: {
     remarkPlugins: [remarkMath],
     rehypePlugins: [rehypeKatex],
   },
 });