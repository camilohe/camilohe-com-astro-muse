import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.camilohe.com',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
