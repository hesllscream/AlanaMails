import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [solidJs(), tailwind()],
  output: 'hybrid',
  adapter: vercel(),
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
