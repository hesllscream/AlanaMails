import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [solidJs(), tailwind()],
  output: 'hybrid',
  adapter: vercel({
    runtime: 'nodejs20.x'
  }),
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
