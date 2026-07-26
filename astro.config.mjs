import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: {
      enabled: true,
    },
  }),
  output: 'server',
  server: {
    port: 4000,
  },
  session: {
    driver: './src/no-session-driver.ts',
  },
});
