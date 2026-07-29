import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
    adapter: cloudflare({
        imageService: "compile",
        platformProxy: {
            enabled: true,
        },
    }),
    compressHTML: false,
    output: "server",
    redirects: {
        "/all-logos.html": "/analyze.html",
        "/test.html": "/compare.html",
    },
    server: {
        port: 4000,
    },
    "site": "https://lucky.logosear.ch",
});
