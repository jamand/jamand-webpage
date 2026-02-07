import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { BlogPost } from './blog-utils';

// Mock astro:content to avoid server-only module error
const mockGetCollection = vi.fn();
vi.mock('astro:content', () => ({
	getCollection: mockGetCollection,
}));

// Import after mocking
const {
	hasTranslation,
	getPostUrl,
	getPostUrlForLang,
	getPostsByLang,
	getPostsWithFallback,
	getAllPostSlugsForLang,
} = await import('./blog-utils');

// Mock blog post factory for testing
function createMockPost(overrides: Partial<BlogPost> = {}): BlogPost {
	return {
		id: 'test-post.md',
		body: '',
		collection: 'blog',
		data: {
			title: 'Test Post',
			slug: 'test-slug',
			pubDate: new Date('2026-01-01'),
			description: 'A test post',
			author: 'Test Author',
			image: {
				url: '/test-image.jpg',
				alt: 'Test image',
			},
			lang: 'en',
			postId: 'test-post',
			tags: [],
			published: true,
			...overrides.data,
		},
		...overrides,
	} as BlogPost;
}

beforeEach(() => {
	mockGetCollection.mockReset();
});

describe('blog-utils', () => {
	describe('hasTranslation', () => {
		it('should return true when post has a translation', async () => {
			const post = createMockPost({
				data: {
					title: 'Test',
					slug: 'test-slug',
					pubDate: new Date(),
					description: 'Test',
					author: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'en',
					postId: 'test-post',
					tags: [],
					published: true,
				},
			});
			const translation = createMockPost({
				data: {
					title: 'Test DE',
					slug: 'test-slug-de',
					pubDate: new Date(),
					description: 'Test',
					author: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'de',
					postId: 'test-post',
					tags: [],
					published: true,
				},
			});
			mockGetCollection.mockResolvedValue([post, translation]);
			expect(await hasTranslation(post)).toBe(true);
		});

		it('should return false when post has no translation', async () => {
			const post = createMockPost();
			mockGetCollection.mockResolvedValue([post]);
			expect(await hasTranslation(post)).toBe(false);
		});

		it('should return false when only post with same postId has same language', async () => {
			const post = createMockPost({
				data: {
					title: 'Test',
					slug: 'test-slug',
					pubDate: new Date(),
					description: 'Test',
					author: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'en',
					postId: 'test-post',
					tags: [],
					published: true,
				},
			});
			mockGetCollection.mockResolvedValue([post]);
			expect(await hasTranslation(post)).toBe(false);
		});

		it('should not count unpublished translations', async () => {
			const post = createMockPost({
				data: {
					title: 'Test',
					slug: 'test-slug',
					pubDate: new Date(),
					description: 'Test',
					author: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'en',
					postId: 'test-post',
					tags: [],
					published: true,
				},
			});
			const unpublishedTranslation = createMockPost({
				data: {
					title: 'Test DE',
					slug: 'test-slug-de',
					pubDate: new Date(),
					description: 'Test',
					author: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'de',
					postId: 'test-post',
					tags: [],
					published: false,
				},
			});
			mockGetCollection.mockResolvedValue([post, unpublishedTranslation]);
			expect(await hasTranslation(post)).toBe(false);
		});
	});

	describe('getPostUrl', () => {
		it('should return URL without language prefix for default language (en)', () => {
			const post = createMockPost({
				id: 'my-first-post.md',
				data: {
					title: 'Test',
					slug: 'my-first-post',
					pubDate: new Date(),
					description: 'Test',
					author: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'en',
					postId: 'my-first-post',
					tags: [],
					published: true,
				},
			});
			expect(getPostUrl(post)).toBe('/posts/my-first-post/');
		});

		it('should return URL with language prefix for non-default language', () => {
			const post = createMockPost({
				id: 'de/mein-erster-post.md',
				data: {
					title: 'Test',
					slug: 'mein-erster-post',
					pubDate: new Date(),
					description: 'Test',
					author: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'de',
					postId: 'mein-erster-post',
					tags: [],
					published: true,
				},
			});
			expect(getPostUrl(post)).toBe('/de/posts/mein-erster-post/');
		});

		it('should use slug from frontmatter for URL generation', () => {
			const post = createMockPost({
				id: 'de/nested/path/post.md',
				data: {
					title: 'Test',
					slug: 'custom-slug',
					pubDate: new Date(),
					description: 'Test',
					author: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'de',
					postId: 'nested-post',
					tags: [],
					published: true,
				},
			});
			expect(getPostUrl(post)).toBe('/de/posts/custom-slug/');
		});

		it('should handle any slug format', () => {
			const post = createMockPost({
				id: 'standalone-post.md',
				data: {
					title: 'Test',
					slug: '20240127-hello-world',
					pubDate: new Date(),
					description: 'Test',
					author: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'en',
					postId: '20240127-hello-world',
					tags: [],
					published: true,
				},
			});
			expect(getPostUrl(post)).toBe('/posts/20240127-hello-world/');
		});
	});

	describe('getPostUrlForLang', () => {
		it('should use page language for URL, not content language', () => {
			const enPost = createMockPost({
				data: {
					title: 'Test',
					slug: 'hello-world',
					pubDate: new Date(),
					description: 'Test',
					author: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'en',
					postId: 'hello',
					tags: [],
					published: true,
				},
			});
			expect(getPostUrlForLang(enPost, 'de')).toBe('/de/posts/hello-world/');
			expect(getPostUrlForLang(enPost, 'en')).toBe('/posts/hello-world/');
		});
	});

	describe('getPostsByLang (published filter)', () => {
		it('should exclude unpublished posts', async () => {
			const published = createMockPost({
				id: 'published.md',
				data: {
					title: 'Published',
					slug: 'published',
					pubDate: new Date('2026-01-01'),
					description: 'Test',
					author: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'en',
					postId: 'published',
					tags: [],
					published: true,
				},
			});
			const draft = createMockPost({
				id: 'draft.md',
				data: {
					title: 'Draft',
					slug: 'draft',
					pubDate: new Date('2026-01-02'),
					description: 'Test',
					author: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'en',
					postId: 'draft',
					tags: [],
					published: false,
				},
			});
			mockGetCollection.mockResolvedValue([published, draft]);

			const posts = await getPostsByLang('en');
			expect(posts).toHaveLength(1);
			expect(posts[0].data.slug).toBe('published');
		});
	});

	describe('getPostsWithFallback', () => {
		it('should return native post when available', async () => {
			const enPost = createMockPost({
				id: 'en/post.md',
				data: {
					title: 'English Post',
					slug: 'my-post',
					pubDate: new Date('2026-01-01'),
					description: 'Test',
					author: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'en',
					postId: 'my-post',
					tags: [],
					published: true,
				},
			});
			const dePost = createMockPost({
				id: 'de/post.md',
				data: {
					title: 'German Post',
					slug: 'my-post',
					pubDate: new Date('2026-01-01'),
					description: 'Test',
					author: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'de',
					postId: 'my-post',
					tags: [],
					published: true,
				},
			});
			mockGetCollection.mockResolvedValue([enPost, dePost]);

			const results = await getPostsWithFallback('de');
			expect(results).toHaveLength(1);
			expect(results[0].isFallback).toBe(false);
			expect(results[0].post.data.lang).toBe('de');
		});

		it('should fall back to English when native language is unavailable', async () => {
			const enPost = createMockPost({
				id: 'en/post.md',
				data: {
					title: 'English Only Post',
					slug: 'english-only',
					pubDate: new Date('2026-01-01'),
					description: 'Test',
					author: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'en',
					postId: 'english-only',
					tags: [],
					published: true,
				},
			});
			mockGetCollection.mockResolvedValue([enPost]);

			const results = await getPostsWithFallback('de');
			expect(results).toHaveLength(1);
			expect(results[0].isFallback).toBe(true);
			expect(results[0].originalLang).toBe('en');
			expect(results[0].post.data.lang).toBe('en');
		});

		it('should exclude unpublished posts from fallback', async () => {
			const unpublished = createMockPost({
				id: 'en/draft.md',
				data: {
					title: 'Draft Post',
					slug: 'draft',
					pubDate: new Date('2026-01-01'),
					description: 'Test',
					author: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'en',
					postId: 'draft',
					tags: [],
					published: false,
				},
			});
			mockGetCollection.mockResolvedValue([unpublished]);

			const results = await getPostsWithFallback('de');
			expect(results).toHaveLength(0);
		});

		it('should include available languages in results', async () => {
			const enPost = createMockPost({
				id: 'en/post.md',
				data: {
					title: 'English Post',
					slug: 'my-post',
					pubDate: new Date('2026-01-01'),
					description: 'Test',
					author: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'en',
					postId: 'my-post',
					tags: [],
					published: true,
				},
			});
			const dePost = createMockPost({
				id: 'de/post.md',
				data: {
					title: 'German Post',
					slug: 'my-post',
					pubDate: new Date('2026-01-01'),
					description: 'Test',
					author: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'de',
					postId: 'my-post',
					tags: [],
					published: true,
				},
			});
			mockGetCollection.mockResolvedValue([enPost, dePost]);

			const results = await getPostsWithFallback('en');
			expect(results[0].availableLanguages).toHaveLength(2);
		});
	});

	describe('getAllPostSlugsForLang', () => {
		it('should generate slug entries for all unique postIds', async () => {
			const enPost = createMockPost({
				id: 'en/post.md',
				data: {
					title: 'English Post',
					slug: 'my-post',
					pubDate: new Date('2026-01-01'),
					description: 'Test',
					author: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					lang: 'en',
					postId: 'my-post',
					tags: [],
					published: true,
				},
			});
			mockGetCollection.mockResolvedValue([enPost]);

			const entries = await getAllPostSlugsForLang('de');
			expect(entries).toHaveLength(1);
			expect(entries[0].slug).toBe('my-post');
			expect(entries[0].isFallback).toBe(true);
		});
	});
});
