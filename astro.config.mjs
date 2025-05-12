import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [tailwind(), react()],
  devOptions: {
    toolbar: false, // Desactiva la DevToolbar
  },
});
