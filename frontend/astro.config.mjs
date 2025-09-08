import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@images": new URL("./src/images", import.meta.url).pathname,
        "@svelte_components": new URL(
          "./src/components/svelte_components",
          import.meta.url
        ).pathname,
      },
    },
  },
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: "css-variables",
    },
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
    drafts: true,
  },
  devToolbar: { enabled: false },
  site: "https://yourdomain.com",
  integrations: [sitemap(), mdx(), svelte()],
});
