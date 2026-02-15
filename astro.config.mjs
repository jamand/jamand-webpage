// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import expressiveCode from 'astro-expressive-code';

import rehypeExternalLinks from 'rehype-external-links';

import rehypeSlug from 'rehype-slug';

import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { toString as hastToString } from 'hast-util-to-string';

import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';

import remarkToc from 'remark-toc';

import { defaultLang, supportedLangs, localeMap } from './src/i18n/translations';

// https://astro.build/config
export default defineConfig({
    integrations: [
        react(),
        expressiveCode(),
        mdx(),
        sitemap({
            i18n: {
                defaultLocale: defaultLang,
                locales: localeMap,
            },
        }),
    ],
    site: process.env.SITE_URL || 'http://localhost:4321',
    base: process.env.BASE_PATH || '/',

    // Inline CSS into HTML to eliminate render-blocking stylesheet requests.
    // Tradeoff: CSS is not cached across pages (~19KB per page, ~4-5KB gzipped).
    build: {
        inlineStylesheets: 'always',
    },

    i18n: {
        locales: [...supportedLangs],
        defaultLocale: defaultLang,
        routing: {
            prefixDefaultLocale: false,
        },
    },

    markdown: {
        remarkPlugins: [remarkReadingTime, [remarkToc, { heading: 'Table of Contents|Inhaltsverzeichnis' }]],
        rehypePlugins: [
            [
                rehypeExternalLinks,
                {
                    content: { type: 'text', value: ' ↗' }
                }
            ],
            rehypeSlug,
            [
                rehypeAutolinkHeadings,
                {
                    behavior: 'prepend',
                    properties: (/** @type {any} */ heading) => ({
                        className: ['heading-anchor'],
                        tabIndex: -1,
                        ariaLabel: `Link to section: ${hastToString(heading)}`,
                    }),
                    content: [],
                }
            ]
         ],
    },

    prefetch: {
        prefetchAll: true
    },

    vite: {
        plugins: [tailwindcss()],
    },
});
