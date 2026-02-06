import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { supportedLangs, defaultLang } from './i18n/translations';

// Export schema for testing
export const blogSchema = z.object({
	title: z.string(),
	pubDate: z.date(),
	description: z.string(),
	author: z.string(),
	image: z.object({
		url: z.string(),
		alt: z.string(),
	}),
	tags: z.array(z.string()),
	lang: z.enum(supportedLangs).default(defaultLang),
	// Link to translation (use the slug of the other language version)
	translationSlug: z.string().optional(),
});

// Define a `loader` and `schema` for each collection
const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/blog' }),
	schema: blogSchema,
});

// Export a single `collections` object to register your collection(s)
export const collections = { blog };
