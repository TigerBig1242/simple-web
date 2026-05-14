import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://tigerbig1242.github.io',
  base: '/simple-web/',
  integrations: [
    react(),
  ],
  vite: {
      plugins: [tailwindcss()]
    },
    theme: {
    // extend: {
    //   colors: {
    //     brew: {
    //       bg: "#f5f1ea",
    //       dark: "#3b2f2f",
    //       cream: "#ede0d4",
    //       accent: "#b08968",
    //     },
    //   },
    // },
  },
});
