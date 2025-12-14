import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  output: 'static',
  integrations: [solidJs(), tailwind(), vercel()],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
