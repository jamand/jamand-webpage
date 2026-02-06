import { describe, it, expect, vi } from 'vitest';
import type { BlogPost } from './blog-utils';

// Mock astro:content to avoid server-only module error
vi.mock('astro:content', () => ({
	getCollection: vi.fn(),
}));

// Import after mocking
const { hasTranslation, getPostUrl } = await import('./blog-utils');

// Mock blog post factory for testing
function createMockPost(overrides: Partial<BlogPost> = {}): BlogPost {
	return {
		id: 'test-post.md',
		body: '',
		collection: 'blog',
		data: {
			title: 'Test Post', slug: 'test-slug',
			pubDate: new Date('2026-01-01'),
			description: 'A test post',
			author: 'Test Author',
			image: {
				url: '/test-image.jpg',
				alt: 'Test image',
			},
			lang: 'en',
			translationSlug: undefined,
			tags: [],
			...overrides.data,
		},
		...overrides,
	} as BlogPost;
}

describe('blog-utils', () => {
	describe('hasTranslation', () => {
		it('should return true when post has translation slug', () => {
			const post = createMockPost({
				data: {
					title: 'Test', slug: 'test-slug',
					pubDate: new Date(),
					description: 'Test', author: 'Test', image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'en',
					translationSlug: 'de/test-post.md',
					tags: [],
				},
			});
			expect(hasTranslation(post)).toBe(true);
		});

		it('should return false when post has no translation slug', () => {
			const post = createMockPost();
			expect(hasTranslation(post)).toBe(false);
		});

		it('should return false when translation slug is empty string', () => {
			const post = createMockPost({
				data: {
					title: 'Test', slug: 'test-slug',
					pubDate: new Date(),
					description: 'Test', author: 'Test', image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'en',
					translationSlug: '',
					tags: [],
				},
			});
			expect(hasTranslation(post)).toBe(false);
		});
	});

	describe('getPostUrl', () => {
		it('should return URL without language prefix for default language (en)', () => {
			const post = createMockPost({
				id: 'my-first-post.md',
				data: {
					title: 'Test', slug: 'my-first-post',
					pubDate: new Date(),
					description: 'Test', author: 'Test', image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'en',
					tags: [],
				},
			});
			expect(getPostUrl(post)).toBe('/posts/my-first-post/');
		});

		it('should return URL with language prefix for non-default language', () => {
			const post = createMockPost({
				id: 'de/mein-erster-post.md',
				data: {
					title: 'Test', slug: 'mein-erster-post',
					pubDate: new Date(),
					description: 'Test', author: 'Test', image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'de',
					tags: [],
				},
			});
			expect(getPostUrl(post)).toBe('/de/posts/mein-erster-post/');
		});

		it('should use slug from frontmatter for URL generation', () => {
			const post = createMockPost({
				id: 'de/nested/path/post.md',
				data: {
					title: 'Test', slug: 'custom-slug',
					pubDate: new Date(),
					description: 'Test', author: 'Test', image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'de',
					tags: [],
				},
			});
			expect(getPostUrl(post)).toBe('/de/posts/custom-slug/');
		});

		it('should handle any slug format', () => {
			const post = createMockPost({
				id: 'standalone-post.md',
				data: {
					title: 'Test', slug: '20240127-hello-world',
					pubDate: new Date(),
					description: 'Test', author: 'Test', image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'en',
					tags: [],
				},
			});
			expect(getPostUrl(post)).toBe('/posts/20240127-hello-world/');
		});
	});
});
