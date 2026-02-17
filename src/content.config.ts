import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { supportedLangs, defaultLang } from './i18n/translations';

// Base project fields (without image() helper — used for type reference)
const projectBaseFields = {
	title: z.string(),
	slug: z.string(),
	description: z.string(),
	tags: z.array(z.string()),
	url: z.string().optional(), // External project URL (e.g. GitHub repo)
	hideImage: z.boolean().default(false), // Hide image on detail page (e.g. when MDX provides custom content)
	lang: z.enum(supportedLangs).default(defaultLang),
	projectId: z.string(), // Shared across translations
	sortOrder: z.number().default(0), // Lower = shown first
	status: z
		.enum(['active', 'completed', 'on-hold', 'planned'])
		.default('active'),
};

// Base blog fields (without image() helper — used for type reference)
const blogBaseFields = {
	title: z.string(),
	slug: z.string(), // URL-friendly slug for the post
	pubDate: z.date(),
	updatedAt: z.date().optional(),
	description: z.string(),
	author: z.string(),
	tags: z.array(z.string()),
	lang: z.enum(supportedLangs).default(defaultLang),
	// Unique identifier shared across all translations of this post
	postId: z.string(),
	published: z.boolean().default(true),
};

// Define a `loader` and `schema` for each collection
const blog = defineCollection({
	loader: glob({
		pattern: '**/[^_]*.{md,mdx}',
		base: './src/blog',
		// Generate ID from file path to ensure uniqueness across languages
		generateId: ({ entry }) => {
			return entry;
		},
	}),
	schema: ({ image }) =>
		z.object({
			...blogBaseFields,
			image: z.object({
				src: image().optional(), // Local image (optimized by Astro)
				url: z.string().optional(), // External URL
				alt: z.string(),
				caption: z.string().optional(),
				author: z.string().optional(), // Attribution name
				authorUrl: z.string().optional(), // Attribution link
			}),
		}),
});

const projects = defineCollection({
	loader: glob({
		pattern: '**/[^_]*.{md,mdx}',
		base: './src/projects',
		generateId: ({ entry }) => {
			return entry;
		},
	}),
	schema: ({ image }) =>
		z.object({
			...projectBaseFields,
			image: z.object({
				src: image().optional(), // Local image (optimized by Astro)
				url: z.string().optional(), // External URL
				alt: z.string(),
				caption: z.string().optional(),
				author: z.string().optional(), // Attribution name
				authorUrl: z.string().optional(), // Attribution link
			}),
		}),
});

// Export a single `collections` object to register your collection(s)
export const collections = { blog, projects };
