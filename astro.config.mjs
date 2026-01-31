// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
    integrations: [react(), expressiveCode(), mdx(), sitemap()],
    site: process.env.SITE_URL || 'http://localhost:4321',
    base: process.env.BASE_PATH || '/',

    vite: {
        plugins: [tailwindcss()],
    },
});
