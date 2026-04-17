// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://baby.chparenting.com",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [
    react(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        const url = item.url;
        if (url === "https://baby.chparenting.com/") {
          item.changefreq = "daily";
          item.priority = 1.0;
        } else if (url.includes("/tools/")) {
          item.changefreq = "weekly";
          item.priority = 0.9;
        } else if (url.includes("/blog/") && !url.endsWith("/blog/")) {
          item.changefreq = "monthly";
          item.priority = 0.7;
        }
        return item;
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
